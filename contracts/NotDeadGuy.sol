// SPDX-License-Identifier: All rights reserved to TetaHQ
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact security@tetahq.com
contract NotDeadGuy is ERC721, ERC721Enumerable, Ownable {
    using Address for address;
    using Strings for uint256;
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    struct PreSaleSlot {
        uint16 freeMintSlots;
        uint16 usedFreeMintSlots;
        uint16 saleSlots;
        uint16 usedSaleSlots;
    }
    
    enum Progress {
        NOT_STARTED,
        ACTIVE,
        FINISHED
    }
    
    struct SystemProgresses {
        bool isMarketOpenForTrading; // For security
        Progress preSaleState;
        Progress publicSaleState;
        Progress tokenConvertState;
    }
    
    struct Shares {
        address shareHolder1Address;
        address shareHolder2Address;
        address shareHolder3Address;
        address developer1Address;
        address developer2Address;
        address developer3Address;
    
        uint16 shareHolder1Cut;
        uint16 shareHolder2Cut;
        uint16 shareHolder3Cut;
        uint16 developer1Cut;
        uint16 developer2Cut;
        
        uint16 developer1MarketCut;
        uint16 developer2MarketCut;
        
        uint16 firstMinterMarketCut;
        uint16 nftHolderCut;
        uint16 weeklyMarketSaleEventCut;
        uint16 systemCut;
    }
    
    struct Constants {
        uint256 sketchPrice;
        uint256 minimumMarketSalePrice;
        uint16 maxTokenAmount;
        uint16 maxBuyAtSameTime;
    }
    
    mapping(address => PreSaleSlot) private _presaleWhitelist;
    mapping(address => uint16) private _sketchCounters;
    mapping(uint256 => uint256) private _marketPrices;
    
    Shares private _shares;
    Constants private _constants;
    
    uint256 private _marketSystemCut;
    
    SystemProgresses public progresses;
    
    uint16 public totalSketchCount;
    
    constructor() ERC721("Not Dead Guy", "NDG") {
        totalSketchCount = 0;
        _marketSystemCut = 0;
    
        _constants = Constants(0.088 ether, 0.001 ether, 10000, 20);
    
        _shares = Shares(address(0x48F10bE806CBD87E725Ca85Fe94555f126BA156D), address(0x127b46b71a3c385A50e57f8E29c68483084c51f6), address(0x6eb49672B26AC890219205dEBCc5f112188cB701), address(0xBB1a24B07e832579b801206b77865D3944427db1), address(0x8B894a78E6f7739eEc7Ca32772F31a54361240C1), address(0x3C2158ab53c030dBA9345E6f7bb55276944aFBA7), 5, 10, 10, 31, 22, 33, 34, 1, 2, 2, 3 );
        
        progresses = SystemProgresses(true, Progress.NOT_STARTED, Progress.NOT_STARTED, Progress.NOT_STARTED);
    }
    
    event FreeSketchesTaken(address to, uint16 sketchCount, uint16 total);
    event SketchesTaken(address to, uint16 sketchCount, uint16 total);
    event NftsMinted(address to, uint256[] nftIds);
    event MarketPriceChanged(uint256 nftId, uint256 newPrice);
    event MarketSale(address from, address to, uint256 nftId, uint256 price, uint256 shareCuts, uint256 holderCut);
    event PresaleStarted();
    event PresaleFinished();
    event PublicSaleStarted();
    event PublicSaleFinished();
    event ConvertingStarted();
    event ConvertingFinished();
    event MarketPaused();
    event MarketResumed();
    event UpsertToWhitelist(address walletAddress, uint8 saleSlots, uint8 freeMintSlots);
    event RewardsSentTo(address walletAddress, uint256 amount);
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://notdeadguy.com/token/";
    }
    
    function safeMint(address to) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        
        return tokenId;
    }
    
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    // Custom codes
    function openMarket() public onlyOwner {
        require(!progresses.isMarketOpenForTrading, "MARKET_ALREADY_OPENED"); // Market already open for trading.
        
        progresses.isMarketOpenForTrading = true;
        
        emit MarketResumed();
    }
    
    function closeMarket() public onlyOwner {
        require(progresses.isMarketOpenForTrading, "MARKET_ALREADY_CLOSED"); // Market already closed for trading.
        
        progresses.isMarketOpenForTrading = false;
    
        emit MarketPaused();
    }
    
    function startPreSale() external onlyOwner {
        require(progresses.preSaleState == Progress.NOT_STARTED, "PRESALE_ACTIVE_OR_FINISHED"); // Pre sale state is already active or finished.

        console.log("Pre sale started!");
        progresses.preSaleState = Progress.ACTIVE;
        
        emit PresaleStarted();
    }
    
    function finishPreSale() external onlyOwner {
        require(progresses.preSaleState == Progress.ACTIVE, "PRESALE_FINISHED_OR_NOT_STARTED"); // Pre sale is already finished or not started.
    
        console.log("Pre sale finished!");
        progresses.preSaleState = Progress.FINISHED;
        
        emit PresaleFinished();
    }
    
    function startPublicSale() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "COMPLETE_PRE_SALE_FIRST"); // You must complete pre sale process before starting public sale.
        require(progresses.publicSaleState == Progress.ACTIVE, "PUBLIC_SALE_NOT_ACTIVE"); // You can not start public sale. Because it is already active or finished.
    
        console.log("Public sale started!");
        progresses.publicSaleState = Progress.ACTIVE;
        
        emit PublicSaleStarted();
    }
    
    function finishPublicSale() external onlyOwner {
        require(progresses.publicSaleState == Progress.ACTIVE, "START_PUBLIC_SALE_FIRST"); // Start pre sale first
        
        console.log("public sale finished!");
        progresses.publicSaleState = Progress.FINISHED;
        
        emit PublicSaleFinished();
    }
    
    function startTokenConverting() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "PRESALE_NOT_FINISHED"); // You can not start token converting phase before pre sale finished.
        require(progresses.publicSaleState == Progress.FINISHED, "PUBLIC_SALE_NOT_FINISHED"); // You can not start token converting phase before public sale finished.
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "START_TOKEN_CONVERT_FIRST"); // Token converting is active or finished. You can not change token converting state to active!
        
        progresses.tokenConvertState = Progress.ACTIVE;
        
        emit ConvertingStarted();
    }
    
    function finishTokenConverting() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "PRESALE_NOT_FINISHED"); // You can not start token converting phase before pre sale finished.
        require(progresses.publicSaleState == Progress.FINISHED, "PUBLIC_SALE_NOT_FINISHED"); // You can not start token converting phase before public sale finished.
        require(progresses.tokenConvertState == Progress.ACTIVE, "TOKEN_CONVERT_NOT_ACTIVE"); // Token converting is finished or not started. You can not change token converting state to finished!
        
        progresses.tokenConvertState = Progress.FINISHED;
        
        emit ConvertingFinished();
    }
    
    function safeAddWalletToPreSaleWhitelist(address walletAddress, uint8 saleSlots, uint8 freeMintSlots) external onlyOwner {
        require(progresses.preSaleState == Progress.NOT_STARTED, "WHITELIST_ONLY_BEFORE_PRESALE");
        require(walletAddress != address(0x0), "YOU_CANNOT_USE_VOID_ADDRESS"); // "Void address can not be used as address"
        require(freeMintSlots + saleSlots > 0, "ADD_SOME_SLOTS"); // "Some slots need to assigned to wallet"
    
        PreSaleSlot storage slot = _presaleWhitelist[walletAddress];
        
        require(slot.freeMintSlots == 0 && slot.saleSlots == 0 && slot.usedFreeMintSlots == 0 && slot.usedSaleSlots == 0, "WALLET_ALREADY_IN_LIST"); // "Wallet already in list"

        _presaleWhitelist[walletAddress] = PreSaleSlot(freeMintSlots, 0, saleSlots, 0);
        console.log("Wallet added to the pre sale whitelist.");
        emit UpsertToWhitelist(walletAddress, saleSlots, freeMintSlots);
    }
    
    function unsafeAddWalletToPreSaleWhitelist(address walletAddress, uint8 saleSlots, uint8 freeMintSlots) public onlyOwner returns(bool) {
        require(progresses.preSaleState == Progress.NOT_STARTED, "WHITELIST_ONLY_BEFORE_PRESALE");
        if(walletAddress == address(0x0)) {
            console.log("Void address can not be used as address");
            return false;
        }
        
        if(freeMintSlots + saleSlots <= 0) {
            console.log("Some slots need to assigned to wallet");
            return false;
        }
        
        PreSaleSlot storage slot = _presaleWhitelist[walletAddress];
        
        if(slot.freeMintSlots != 0 || slot.saleSlots != 0 || slot.usedFreeMintSlots != 0 || slot.usedSaleSlots != 0) {
            console.log("Wallet already in list");
            return false;
        }
    
        _presaleWhitelist[walletAddress] = PreSaleSlot(freeMintSlots, 0, saleSlots, 0);
        console.log("Wallet added to the pre sale whitelist.");
    
        emit UpsertToWhitelist(walletAddress, saleSlots, freeMintSlots);
        return true;
    }
    
    function removeWalletFromPreSaleWhitelist(address walletAddress) external onlyOwner {
        delete _presaleWhitelist[walletAddress];
    }
    
    function bulkAddWalletsToPreSaleWhitelist(address[] memory walletAddresses, uint8[] memory saleSlotsOfWallets, uint8[] memory freeMintSlotsOfWallets) external onlyOwner returns(uint32 succeeded, uint32 failed) {
        require(progresses.preSaleState == Progress.NOT_STARTED, "WHITELIST_ONLY_BEFORE_PRESALE");
        require(walletAddresses.length == saleSlotsOfWallets.length && walletAddresses.length == freeMintSlotsOfWallets.length && walletAddresses.length > 0, "WALLETS_LIST_EMPTY"); // "Length of wallets must above 0 and parameter lengths must be same."
        
        uint32 addedCount = 0;
        uint32 failedCount = 0;
        
        for(uint id = 0; id < walletAddresses.length; id++) {
            bool isAdded = unsafeAddWalletToPreSaleWhitelist(walletAddresses[id], saleSlotsOfWallets[id], freeMintSlotsOfWallets[id]);
            
            if(isAdded) {
                addedCount++;
            } else {
                failedCount++;
            }
        }
        
        return (addedCount, failedCount);
    }
    
    function claimFreeSketchesAtPresale(uint16 howMany) external returns(uint16) {
        require(progresses.preSaleState == Progress.ACTIVE, "FREE_MINTING_ONLY_PRESALE"); // Free minting only available at pre sale.
        require(howMany <= _constants.maxBuyAtSameTime, "MAX_20_SKETCH_AT_SAME_TIME");
        
        PreSaleSlot storage presaleSlot = _presaleWhitelist[msg.sender];
        require(presaleSlot.freeMintSlots - presaleSlot.usedFreeMintSlots >= howMany, "NO_PRESALE_FREE_MINT_SLOTS"); // You don't have that many free mint slots.
    
        presaleSlot.usedFreeMintSlots = presaleSlot.usedFreeMintSlots + howMany;
        _sketchCounters[msg.sender] = _sketchCounters[msg.sender] + howMany;
        totalSketchCount = totalSketchCount + howMany;
    
        emit FreeSketchesTaken(msg.sender, howMany, _sketchCounters[msg.sender]);
        return _sketchCounters[msg.sender];
    }
    
    function claimPresaleSketchesAtPresale(uint16 howMany) external payable returns(uint16) {
        require(progresses.preSaleState == Progress.ACTIVE, "FREE_MINTING_ONLY_PRESALE"); // Pre sale minting only available at pre sale.
        require(howMany <= _constants.maxBuyAtSameTime, "MAX_20_SKETCH_AT_SAME_TIME");
        require(msg.value == howMany * _constants.sketchPrice, "INVALID_PRICE");
        
        PreSaleSlot storage presaleSlot = _presaleWhitelist[msg.sender];
        require(presaleSlot.saleSlots - presaleSlot.usedSaleSlots >= howMany, "NO_PRESALE_MINT_SLOTS"); // You don't have that many pre sale mint slots.
    
        presaleSlot.usedSaleSlots = presaleSlot.usedSaleSlots + howMany;
        _sketchCounters[msg.sender] = _sketchCounters[msg.sender] + howMany;
        totalSketchCount = totalSketchCount + howMany;
    
        emit SketchesTaken(msg.sender, howMany, _sketchCounters[msg.sender]);
        return _sketchCounters[msg.sender];
    }
    
    function claimSketchesAtPublicSale(uint16 howMany) external payable returns(uint16) {
        require(progresses.publicSaleState == Progress.ACTIVE, "FREE_MINTING_ONLY_PUBLIC_SALE"); // Minting only available at public sale
        require(howMany <= _constants.maxBuyAtSameTime, "MAX_20_SKETCH_AT_SAME_TIME");
        require(totalSketchCount + howMany < _constants.maxTokenAmount, "SKETCH_LIMIT_EXCEEDED");
        require(msg.value == howMany * _constants.sketchPrice, "INVALID_PRICE");
    
        _sketchCounters[msg.sender] = _sketchCounters[msg.sender] + howMany;
        totalSketchCount = totalSketchCount + howMany;
    
        emit SketchesTaken(msg.sender, howMany, _sketchCounters[msg.sender]);
        return _sketchCounters[msg.sender];
    }
    
    function claimTokens(uint16 howMany) external returns(uint256[] memory) {
        require(progresses.tokenConvertState == Progress.ACTIVE, "CONVERT_SHOULD_BE_ACTIVE"); // Converting should be active.
        require(howMany <= _constants.maxBuyAtSameTime, "MAX_20_MINT_AT_SAME_TIME");
        require(_sketchCounters[msg.sender] >= howMany, "NOT_ENOUGH_SKETCHES");
    
        _sketchCounters[msg.sender] = _sketchCounters[msg.sender] - howMany;
        totalSketchCount = totalSketchCount - howMany;

        uint256[] memory boughtTokens = new uint256[](howMany);
        
        for(uint16 id = 0; id < howMany; id++) {
            uint256 tokenId = safeMint(msg.sender);
            boughtTokens[id] = tokenId;
        }
    
        emit NftsMinted(msg.sender, boughtTokens);
        return boughtTokens;
    }
    
    function splitShares() external onlyOwner {
        require(address(this).balance > 0, "NOT_ENOUGH_BALANCE_IN_CONTRACT");
        uint256 totalBalance = address(this).balance;
        
        uint256 shareholder1Cut = totalBalance / 100 * _shares.shareHolder1Cut;
        Address.sendValue(payable(_shares.shareHolder1Address), shareholder1Cut);
    
        uint256 shareholder2Cut = totalBalance / 100 * _shares.shareHolder2Cut;
        Address.sendValue(payable(_shares.shareHolder2Address), shareholder2Cut);
    
        uint256 developer1Cut = totalBalance / 100 * _shares.developer1Cut;
        Address.sendValue(payable(_shares.developer1Address), developer1Cut);
    
        uint256 developer2Cut = totalBalance / 100 * _shares.developer2Cut;
        Address.sendValue(payable(_shares.developer2Address), developer2Cut);
    
        Address.sendValue(payable(_shares.developer3Address), address(this).balance);
    }
    
    function splitMarketShares() external onlyOwner {
        require(progresses.publicSaleState == Progress.FINISHED && progresses.tokenConvertState != Progress.FINISHED, "FOR_SHARE_HOLDERS_SECURITY");
        require(_marketSystemCut > 0, "NOT_ENOUGH_BALANCE_IN_CONTRACT");
        
        uint256 totalSent = 0;
        
        uint256 developer1Cut = _marketSystemCut / 100 * _shares.developer1MarketCut;
        Address.sendValue(payable(_shares.developer1Address), developer1Cut);
        totalSent = totalSent + developer1Cut;
    
        uint256 developer2Cut = _marketSystemCut / 100 * _shares.developer2MarketCut;
        Address.sendValue(payable(_shares.developer2Address), developer2Cut);
        totalSent = totalSent + developer2Cut;
    
        Address.sendValue(payable(_shares.developer2Address), _marketSystemCut - totalSent);
        _marketSystemCut = 0;
    }
    
    function setMarketPrice(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "INVALID_OWNER");
        require(price == 0 || price >= _constants.minimumMarketSalePrice, "PRICE_MUST_0_OR_MARKETMIN");
    
        _marketPrices[tokenId] = price;
        emit MarketPriceChanged(tokenId, price);
    }
    
    function buyFromMarket(uint256 tokenId) external payable {
        require(ownerOf(tokenId) != msg.sender, "ALREADY_OWNER_OF_NFT");
        require(_marketPrices[tokenId] > 0, "ITEM_NOT_IN_SALE");
        require(msg.value == _marketPrices[tokenId], "PAY_EXACT_PRICE");
    
        uint256 totalPaidAmount = msg.value;
        uint256 shareCuts = 0;
        
        uint256 firstMinterCut = totalPaidAmount / 100 * _shares.firstMinterMarketCut;
        shareCuts = shareCuts + firstMinterCut;
    
        uint256 systemCut = totalPaidAmount / 100 * _shares.systemCut;
        shareCuts = shareCuts + systemCut;
        _marketSystemCut = _marketSystemCut + systemCut;
    
        uint256 weeklyMarketSaleEventFundCut = totalPaidAmount / 100 * _shares.weeklyMarketSaleEventCut;
        shareCuts = shareCuts + weeklyMarketSaleEventFundCut;
    
        uint256 nftHoldersCut = totalPaidAmount / 100 * _shares.nftHolderCut;
        shareCuts = shareCuts + nftHoldersCut;
        
        address previousHolder = ownerOf(tokenId);
        transferFrom(previousHolder, msg.sender, tokenId);
        _marketPrices[tokenId] = 0;
        Address.sendValue(payable(previousHolder), totalPaidAmount - shareCuts);
        emit MarketSale(previousHolder, msg.sender, tokenId, totalPaidAmount, shareCuts, totalPaidAmount - shareCuts);
    }
    
    function sendRewardsTo(address payable to, uint256 amount) public onlyOwner {
        require(progresses.tokenConvertState == Progress.FINISHED, "SERVER_SEND_REWARD_EVENT");
        Address.sendValue(to, amount);
        emit RewardsSentTo(to, amount);
    }
    
    // Views
    function myPresaleSlot() public view returns(uint16 freeMintSlots, uint16 usedFreeMintSlots, uint16 saleSlots, uint16 usedSaleSlots) {
        PreSaleSlot storage slot = _presaleWhitelist[msg.sender];
        return (slot.freeMintSlots, slot.usedFreeMintSlots, slot.saleSlots, slot.usedSaleSlots);
    }
}
