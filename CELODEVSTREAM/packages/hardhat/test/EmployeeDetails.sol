// SPDX-License-Identifier: MIT

// Version of Solidity compiler this program was written for
pragma solidity >=0.7.0 <0.9.0;


contract EmployeeDetails {
    struct Employee {
        address payable owner;
        string name;
        address walletAddress;
        string paymentMethod;
        uint256 salary;
        uint256 dateCaptured;
    }

    mapping(address => Employee[]) private employeesByUser;
    mapping(address => uint256) private userEmployeeCount;

    event EmployeeDetailsCaptured(
        address walletAddress,
        string name,
        string paymentMethod,
        uint256 salary,
        uint256 dateCaptured
    );

    event EmployeeDetailsUpdated(
        address walletAddress,
        string name,
        string paymentMethod,
        uint256 salary
    );

    event EmployeeDetailsDeleted(address indexed owner, uint256 indexed index);

    modifier onlyEmployeeOwner(uint256 _index) {
        require(
            employeesByUser[msg.sender][_index].owner == msg.sender,
            "You are not authorized to perform this action"
        );
        _;
    }

    modifier validEmployeeIndex(uint256 _index) {
        require(_index < userEmployeeCount[msg.sender], "Invalid employee index");
        _;
    }

    function captureEmployeeDetails(
        string memory _name,
        address _walletAddress,
        string memory _paymentMethod,
        uint256 _salary
    ) external {
        employeesByUser[msg.sender].push(
            Employee(
                payable(msg.sender),
                _name,
                _walletAddress,
                _paymentMethod,
                _salary,
                block.timestamp
            )
        );

        // Increase the total count of employees for the user
        userEmployeeCount[msg.sender]++;

        emit EmployeeDetailsCaptured(
            _walletAddress,
            _name,
            _paymentMethod,
            _salary,
            block.timestamp
        );
    }

    function getEmployeeDetails(uint256 _index)
        external
        view
        validEmployeeIndex(_index)
        returns (
            address payable owner,
            string memory name,
            address walletAddress,
            string memory paymentMethod,
            uint256 salary,
            uint256 dateCaptured
        )
    {
        Employee memory employee = employeesByUser[msg.sender][_index];
        return (
            employee.owner,
            employee.name,
            employee.walletAddress,
            employee.paymentMethod,
            employee.salary,
            employee.dateCaptured
        );
    }

    function updateEmployeeDetails(
        uint256 _index,
        address _walletAddress,
        string memory _name,
        string memory _paymentMethod,
        uint256 _salary
    ) external validEmployeeIndex(_index) onlyEmployeeOwner(_index) {
        Employee storage employee = employeesByUser[msg.sender][_index];
        employee.name = _name;
        employee.walletAddress = _walletAddress;
        employee.paymentMethod = _paymentMethod;
        employee.salary = _salary;

        emit EmployeeDetailsUpdated(
            _walletAddress,
            _name,
            _paymentMethod,
            _salary
        );
    }

    function deleteEmployeeDetails(uint256 _index) external validEmployeeIndex(_index) onlyEmployeeOwner(_index) {
        // Delete the employee from the array and move the last employee to the deleted position for gas optimization
        uint256 lastIndex = userEmployeeCount[msg.sender] - 1;
        Employee storage lastEmployee = employeesByUser[msg.sender][lastIndex];
        Employee storage employeeToDelete = employeesByUser[msg.sender][_index];
        employeeToDelete.name = lastEmployee.name;
        employeeToDelete.walletAddress = lastEmployee.walletAddress;
        employeeToDelete.paymentMethod = lastEmployee.paymentMethod;
        employeeToDelete.salary = lastEmployee.salary;
        employeeToDelete.dateCaptured = lastEmployee.dateCaptured;
        employeeToDelete.owner = lastEmployee.owner;

        // Decrease the total count of employees for the user
        userEmployeeCount[msg.sender]--;

        emit EmployeeDetailsDeleted(msg.sender, _index);
    }

    function getNumberOfEmployees() external view returns (uint256) {
        return userEmployeeCount[msg.sender];
    }
}
