// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {RobotCaller} from "./lib/RobotCaller.sol";

import "./interfaces/Enums.sol";

import "./interfaces/IShop.sol";
import "./interfaces/IProducts.sol";

error NotARobot();
error NotAnOwner();

contract Warehouse is VRFConsumerBaseV2Plus, RobotCaller {

    uint256 s_subscriptionId = 104277724216953405907676134306488521952870325802654825230121905422406103355392;
	address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
	bytes32 s_keyHash = 0x9e1344a1247c8a1785d0a4681a27152bffdb43666ae5bf7d14d24a5efd44bf71;
	uint32 callbackGasLimit = 40000;
	uint16 requestConfirmations = 3;
	uint32 numWords =  1;

	enum Activity {
		Picking, Packing, Delivering
	}

	IShop Shop;
	IProducts Products;

	mapping (address => bool) _robotApproval;
	mapping (uint256 => Activity) _requestToActivity;
	mapping (uint256 => string) _requestToOrder;

	event WarehouseActivity(string orderId, Enums.OrderStatus status);
	event AssingRobot(string orderId, Activity activity, uint256 robotId);
	event RequestRobotId(string orderId, uint256 requestId);
	event ActivityVerifier(string orderId, Activity activity, address indexed verifier);

	constructor(address shop, address products) VRFConsumerBaseV2Plus(vrfCoordinator) RobotCaller() {
		Shop = IShop(shop);
		Products = IProducts(products);
	}

	function setRobot(address robot) onlyOwner external {
		_robotApproval[robot] = true;
	}

	function processOrder(string memory orderId) onlyOwner external {
		Shop.updateOrderStatus(orderId, Enums.OrderStatus.Processing);

		emit WarehouseActivity(orderId, Enums.OrderStatus.Processing);
	}

	function pickOrder(string memory orderId, address verifier) onlyRobot external {
		Shop.updateOrderStatus(orderId, Enums.OrderStatus.Picked);

		emit WarehouseActivity(orderId, Enums.OrderStatus.Picked);
		emit ActivityVerifier(orderId, Activity.Picking, verifier);
	} 

	function packOrder(string memory orderId, address verifier) onlyRobot external {
		Shop.updateOrderStatus(orderId, Enums.OrderStatus.Packed);

		emit WarehouseActivity(orderId, Enums.OrderStatus.Packed);
		emit ActivityVerifier(orderId, Activity.Packing, verifier);
	}

	function deliverOrder(string memory orderId, address verifier) onlyRobot external {
		Shop.updateOrderStatus(orderId, Enums.OrderStatus.Delivered);

		Products.mintProduct(Shop.getOrderProductId(orderId), Shop.getOrderCustomer(orderId));

		emit WarehouseActivity(orderId, Enums.OrderStatus.Delivered);
		emit ActivityVerifier(orderId, Activity.Delivering, verifier);
	}

	function generateRobotId(string memory orderId, Activity activityType) onlyOwner external returns(uint256) {
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );

		_requestToActivity[requestId] = activityType;
		_requestToOrder[requestId] = orderId;

		emit RequestRobotId(orderId, requestId);

		return requestId;
	}

    function fulfillRandomWords(
		uint256 requestId, uint256[] 
		calldata randomWords
	) internal override {
		uint8 robotId = 1;
		unchecked {
			robotId = uint8((randomWords[0] % 20) + 1);
		}
		emit AssingRobot(_requestToOrder[requestId], _requestToActivity[requestId], robotId);
    }

	modifier onlyRobot {
		if(!_robotApproval[msg.sender]) revert NotARobot();
		_;
	}
}