// SPDX-License-Identifier: MIT

// Version of Solidity compiler this program was written for
pragma solidity >=0.7.0 <0.9.0;

contract CelodevsDetails {
    struct Celodev {
        address payable owner;
        string name;
        address walletAddress;
        string paymentCurrency;
        string taskDescription;
        uint256 rewardAmount;
        uint256 dateCaptured;
    }

    mapping(address => Celodev[]) private CelodevsByUser;
    mapping(address => uint256) private userCelodevCount;

    event CelodevDetailsCaptured(
        address walletAddress,
        string name,
        string paymentCurrency,
        string taskDescription,
        uint256 rewardAmount,
        uint256 dateCaptured
    );

    event CelodevDetailsUpdated(
        address walletAddress,
        string name,
        string paymentCurrency,
        string taskDescription,
        uint256 rewardAmount
    );

    event CelodevDetailsDeleted(address indexed owner, uint256 indexed index);

    modifier onlyCelodevOwner(uint256 _index, address user) {
        require(
            CelodevsByUser[user][_index].owner == user,
            "You are not authorized to perform this action"
        );
        _;
    }

    modifier validCelodevIndex(uint256 _index, address user) {
        require(_index < userCelodevCount[user], "Invalid Celodev index");
        _;
    }

    function captureCelodevDetails(
        string memory _name,
        address _walletAddress,
        string memory _paymentCurrency,
        string memory _taskDescription,
        uint256 _rewardAmount,
		address user
    ) external {
        CelodevsByUser[user].push(
            Celodev(
                payable(user),
                _name,
                _walletAddress,
                _paymentCurrency,
				_taskDescription,
                _rewardAmount,
                block.timestamp
            )
        );

        // Increase the total count of Celodevs for the user
        userCelodevCount[user]++;

        emit CelodevDetailsCaptured(
            _walletAddress,
            _name,
            _paymentCurrency,
			_taskDescription,
            _rewardAmount,
            block.timestamp
        );
    }

    function getCelodevDetails(
        uint256 _index,
		address user
    )
        external
        view
		validCelodevIndex(_index, user)
        returns (
            address payable owner,
            string memory name,
            address walletAddress,
            string memory paymentCurrency,
			string memory taskDescription,
            uint256 rewardAmount,
            uint256 dateCaptured
        )
    {
        Celodev memory celodev = CelodevsByUser[user][_index];
        return (
            celodev.owner,
            celodev.name,
            celodev.walletAddress,
            celodev.paymentCurrency,
            celodev.taskDescription,
			celodev.rewardAmount,
            celodev.dateCaptured
        );
    }

    function updateCelodevDetails(
        uint256 _index,
        address _walletAddress,
        string memory _name,
        string memory _paymentCurrency,
		string memory _taskDescription,
        uint256 _rewardAmount,
		address user
    ) external validCelodevIndex(_index, user) onlyCelodevOwner(_index, user) {
        Celodev storage celodev = CelodevsByUser[user][_index];
        celodev.name = _name;
        celodev.walletAddress = _walletAddress;
        celodev.paymentCurrency = _paymentCurrency;
		celodev.taskDescription = _taskDescription;
        celodev.rewardAmount = _rewardAmount;

        emit CelodevDetailsUpdated(
            _walletAddress,
            _name,
            _paymentCurrency,
			_taskDescription,
            _rewardAmount
        );
    }

    function deleteCelodevDetails(
        uint256 _index,
		address user
    ) external validCelodevIndex(_index, user) onlyCelodevOwner(_index, user) {
        // Delete the Celodev from the array and move the last Celodev to the deleted position for gas optimization
        uint256 lastIndex = userCelodevCount[user] - 1;
        Celodev storage lastCelodev = CelodevsByUser[user][lastIndex];
        Celodev storage CelodevToDelete = CelodevsByUser[user][_index];
        CelodevToDelete.name = lastCelodev.name;
        CelodevToDelete.walletAddress = lastCelodev.walletAddress;
        CelodevToDelete.paymentCurrency = lastCelodev.paymentCurrency;
		CelodevToDelete.paymentCurrency = lastCelodev.taskDescription;
        CelodevToDelete.rewardAmount = lastCelodev.rewardAmount;
        CelodevToDelete.dateCaptured = lastCelodev.dateCaptured;
        CelodevToDelete.owner = lastCelodev.owner;

        // Decrease the total count of Celodevs for the user
        userCelodevCount[user]--;

        emit CelodevDetailsDeleted(user, _index);
    }

   function getNumberOfCelodevs(address user) external view returns (uint256) {
    return userCelodevCount[user];
}
}
