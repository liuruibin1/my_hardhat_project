// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Owned.sol";
import "./ERC721.sol";

interface IRenderer {
    function tokenURI(uint256 id) external view returns (string memory);
}

contract FrenpetNFT is Owned, ERC721{
    IRenderer public renderer;
    uint256 public _tokenIds;
    mapping(address => bool) public isMinter;
    constructor() Owned(msg.sender) ERC721("Frenpet NFT", "Frenpet") {

    }

    //公开铸造
    function mint(address to) public {
        require(isMinter[msg.sender], "Unauthorized");

        // mint NFT
        _mint(to, _tokenIds);
        _tokenIds++;
    }

    function burnInGame(uint256 id) external {
        require(isMinter[msg.sender], "Unauthorized");

        _burn(id);
    }

    /*//////////////////////////////////////////////////////////////
                       Metadata
   //////////////////////////////////////////////////////////////*/

    function tokenURI(uint256 id) public view override returns (string memory) {
        return renderer.tokenURI(id);
    }

    /*//////////////////////////////////////////////////////////////
                       admin
   //////////////////////////////////////////////////////////////*/

    function setRenderer(IRenderer _renderer) external onlyOwner {
        renderer = _renderer;
    }

    function setMinter(address _minter, bool _isAllowed) external onlyOwner {
        isMinter[_minter] = _isAllowed;
    }

}
