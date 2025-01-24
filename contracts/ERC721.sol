// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

//Imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title 
 * @author 
 * @notice 
 * @notice 
 * @dev 
 */
contract KeepCodingProduct is ERC721{

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      ATRIBUTOS
     * -----------------------------------------------------------------------------------------------------
     */

    string public baseURI;
    uint256 public tokenIdCounter;

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      CONSTRUCTOR
     * -----------------------------------------------------------------------------------------------------
     */

    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC721(_name, _symbol){
        baseURI = _baseURI;
        tokenIdCounter = 0;
    }

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      ERRORS
     * -----------------------------------------------------------------------------------------------------
     */

    /**
     * Los errores son lanzados mediante la instruccion revert, normalmente despues de comprobar una condicion.
     * El nombre del error explica cual es el motivo por el se ha revertido la transaccion. 
     * Para mas informacion, buscar la condicion en la que se lanza el error.
     */

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      MODIFIERS
     * -----------------------------------------------------------------------------------------------------
     */

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      EVENTS
     * -----------------------------------------------------------------------------------------------------
     */

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      FUNCIONES
     * -----------------------------------------------------------------------------------------------------
     */

    function mintNewProduct() public{
        tokenIdCounter++;
        _mint(msg.sender,tokenIdCounter);
    }

    function transferProduct() public{

    }

    function ownerOfProduct() public{

    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
        return string.concat(baseURI,"/",Strings.toString(_tokenId));
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}