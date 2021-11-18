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
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    struct PreSaleSlot {
        uint8 freeMintSlots;
        uint8 usedFreeMintSlots;
        uint8 saleSlots;
        uint8 usedSaleSlots;
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
    
    struct EarningInfo {
        uint128 earningsFromFirstOwnerOfNFT;
        uint128 earningsFromSharings;
        uint128 earningsFromWeeklyLeaderboard;
        uint128 totalEarnings;
    }
    
    mapping(address => PreSaleSlot) private _presaleWhitelist;
    
    SystemProgresses public progresses;
    
    constructor() ERC721("Not Dead Guy", "NDG") {
        progresses = SystemProgresses(true, Progress.NOT_STARTED, Progress.NOT_STARTED, Progress.NOT_STARTED);
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://notdeadguy.com/token/";
    }
    
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
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
        require(!progresses.isMarketOpenForTrading, "Market already open for trading.");
        
        progresses.isMarketOpenForTrading = true;
    }
    
    function closeMarket() public onlyOwner {
        require(progresses.isMarketOpenForTrading, "Market already closed for trading.");
        
        progresses.isMarketOpenForTrading = false;
    }
    
    function startPreSale() external onlyOwner {
        require(progresses.publicSaleState == Progress.NOT_STARTED, "Public sale is active or finished. You can not change pre sale state!");
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "Token converting is active or finished. You can not change pre sale state!");
        require(progresses.preSaleState == Progress.NOT_STARTED, "You can not start pre sale. Because it is already active or finished.");

        console.log("Pre sale started!");
        progresses.preSaleState == Progress.ACTIVE;
    }
    
    function finishPreSale() external onlyOwner {
        require(progresses.publicSaleState == Progress.NOT_STARTED, "Public sale is active or finished. You can not change pre sale state!");
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "Token converting is active or finished. You can not change pre sale state!");
        require(progresses.preSaleState == Progress.ACTIVE, "You can not finish the pre sale. Because it is already finished or not started.");
    
        console.log("Pre sale finished!");
        progresses.preSaleState == Progress.FINISHED;
    }
    
    function startPublicSale() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "You must complete pre sale process before starting public sale.");
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "Token converting is active or finished. You can not change public sale state!");
        require(progresses.publicSaleState == Progress.NOT_STARTED, "You can not start public sale. Because it is already active or finished.");
    
        console.log("Public sale started!");
        progresses.publicSaleState == Progress.ACTIVE;
    }
    
    function finishPreSale() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "You must complete pre sale process before starting public sale.");
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "Token converting is active or finished. You can not change public sale state!");
        require(progresses.preSaleState == Progress.ACTIVE, "You can not finish the public sale. Because it is already finished or not started.");
        
        console.log("Public sale finished!");
        progresses.publicSaleState == Progress.FINISHED;
    }
    
    function startTokenConverting() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "You can not start token converting phase before pre sale finished.");
        require(progresses.publicSaleState == Progress.FINISHED, "You can not start token converting phase before public sale finished.");
        require(progresses.tokenConvertState == Progress.NOT_STARTED, "Token converting is active or finished. You can not change token converting state to active!");
        
        progresses.tokenConvertState = Progress.ACTIVE;
    }
    
    function finishTokenConverting() external onlyOwner {
        require(progresses.preSaleState == Progress.FINISHED, "You can not start token converting phase before pre sale finished.");
        require(progresses.publicSaleState == Progress.FINISHED, "You can not start token converting phase before public sale finished.");
        require(progresses.tokenConvertState == Progress.ACTIVE, "Token converting is finished or not started. You can not change token converting state to finished!");
        
        progresses.tokenConvertState = Progress.FINISHED;
    }
    
    function safeAddWalletToPreSaleWhitelist(address walletAddress, uint8 saleSlots, uint8 freeMintSlots) external onlyOwner {
        require(walletAddress != address(0x0), "Void address can not be used as address");
        require(freeMintSlots + saleSlots > 0, "Some slots need to assigned to wallet");
    
        PreSaleSlot slot = _presaleWhitelist[walletAddress];
        
        require(slot.freeMintSlots == 0 && slot.saleSlots == 0 && slot.usedFreeMintSlots == 0 && slot.usedSaleSlots == 0, "Wallet already in list");

        _presaleWhitelist[walletAddress] = PreSaleSlot(freeMintSlots, 0, saleSlots, 0);
        console.log("Wallet added to the pre sale whitelist.");
    }
    
    function unsafeAddWalletToPreSaleWhitelist(address walletAddress, uint8 saleSlots, uint8 freeMintSlots) external onlyOwner returns(bool) {
        if(walletAddress == address(0x0)) {
            console.log("Void address can not be used as address");
            return false;
        }
        
        if(freeMintSlots + saleSlots <= 0) {
            console.log("Some slots need to assigned to wallet");
            return false;
        }
        
        PreSaleSlot slot = _presaleWhitelist[walletAddress];
        
        if(slot.freeMintSlots != 0 || slot.saleSlots != 0 || slot.usedFreeMintSlots != 0 || slot.usedSaleSlots != 0) {
            console.log("Wallet already in list");
            return false;
        }
    
        _presaleWhitelist[walletAddress] = PreSaleSlot(freeMintSlots, 0, saleSlots, 0);
        console.log("Wallet added to the pre sale whitelist.");
        return true;
    }
    
    function removeWalletFromPreSaleWhitelist(address walletAddress) external onlyOwner {
        delete _presaleWhitelist[walletAddress];
    }
    
    function bulkAddWalletsToPreSaleWhitelist(address[] memory walletAddresses, uint8[] memory saleSlotsOfWallets, uint8[] memory freeMintSlotsOfWallets) external onlyOwner returns(uint32 succeeded, uint32 failed) {
        require(walletAddresses.length == saleSlotsOfWallets.length && walletAddresses.length == freeMintSlots.length && walletAddresses.length > 0, "Length of wallets must above 0 and parameter lengths must be same.");
        
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
    
    
}
