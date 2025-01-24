// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

//Imports
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title 
 * @author 
 * @notice 
 * @notice 
 * @dev 
 */
contract KeepCodingCoin is ERC20 {

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      ATRIBUTOS
     * -----------------------------------------------------------------------------------------------------
     */

    uint8 public numberOfDecimals;

    /**
     * -----------------------------------------------------------------------------------------------------
     *                                      CONSTRUCTOR
     * -----------------------------------------------------------------------------------------------------
     */

    constructor(
        uint8 _decimals,
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol
    ) ERC20(
        _name,
        _symbol
    ){
        _mint(msg.sender, _initialSupply);
        numberOfDecimals = _decimals;
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

    function decimals() public view override returns(uint8){
        return numberOfDecimals;
    }

    //Mintea una unidad de moneda. La nueva moneda pertenece al address que hace la llamada
    function mintNewCoin() public {
        _mint(msg.sender, 1 * 10 ** numberOfDecimals);
    }

    function transferCoin() public{

    }

    function freezeAddress() public{

    }

    function unfreezeAddress() public{

    }

    function checkBalance() public{

    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}