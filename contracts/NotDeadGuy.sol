// SPDX-License-Identifier: All rights reserved to TetaHQ
pragma solidity ^0.8.9;

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
    
    bool public isMarketOpened = false;
    bool public isPreSaleOpened = false;
    bool public isPublicSaleOpened = false;
    
    constructor() ERC721("Not Dead Guy", "NDG") {}
    
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
    function changeMarketState(bool newState) public onlyOwner {
        isMarketOpened = newState;
    }
    
    function changePreSaleState(bool newState) public onlyOwner {
        isPreSaleOpened = newState;
    }
    
    function changePublicSaleState(bool newState) public onlyOwner {
        isPublicSaleOpened = newState;
    }
}
