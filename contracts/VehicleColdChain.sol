pragma solidity ^0.8.13;

library CryptoSuite {

    function splitSignature(bytes memory sig) internal pure returns(uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65, "Signature is not valid;");

    assembly {
        // Get first 32 bytes
        r := mload(add(sig,32))
        // Next 32 bytes
        s := mload(add(sig,64))
        // Next last bytes
        v := byte(0, mload(add(sig,96)))
    }

    return (v,r,s);
    }

    // Function to extract the signer from message and signature
    function recoveredSigner(bytes32 message, bytes memory sig) internal pure returns (address) {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix,message));

        return ecrecover(prefixedHash, v,r,s);
    }

}

contract VehicleColdChain {

address public owner;
    constructor() {
    owner = msg.sender;
    }

    // User class mode
    enum Mode { MANUFACTURER, INSPECTOR, SUPPLIER, CUSTOMER }

    struct Entity {
        address id;
        string name;
        Mode mode;
        uint[] certificateIds;
    } 

    enum Status { MANUFACTURED, INSPECTED, DELIVERING_TO_SUPPLIER, STORED, DELIVERING_TO_BUYER, DELIVERED }

    struct Certificate {
        uint id;
        Entity issuer;
        Entity prover;
        bytes signature;
        Status status;
        string message;
        uint256 timestamp;

    }

    struct Vehicle {
        string id;
        string brand;
        address manufacturer;
        address current_owner;
        string  model;
        uint pricePreDecimal;
        uint pricePostDecimal;
        string color;
        uint manufactured_year;
        string manufactured_city;
        string manufactured_country;
        string additional_comment;
        uint[] certificateIds;
    }

    uint public constant MAX_CERTIFICATIONS = 10;

    uint[] public certificateIds;
    string[] public vehicleIds;
    address[] public entityIds;

    mapping(string => Vehicle) public vehicles;
    mapping(uint => Certificate) public certificates;
    mapping(address => Entity) public entities;

    event AddEntity(address entityId, string entityMode, string entityName);
    event AddVehicle(string vehicleId, address indexed manufacturer);
    event IssueCertificate(address indexed issuer, address indexed prover, uint certificateId, string message);    

    function getEntitiesCount() public view returns(uint){
        return entityIds.length;
    }
    function getVehiclesCount() public view returns(uint){
        return vehicleIds.length;
    }
    
    function getEntityByIndex(uint index) public view returns(Entity memory entity){
    return entities[entityIds[index]];
    }
    function getVehicleByIndex(uint index) public view returns(Vehicle memory vehicle){
    Vehicle memory autoVehicle = vehicles[vehicleIds[index]];
    return  autoVehicle;
    }

   
    


    function addEntity(address _id, string memory _mode, string memory _name) public {
        Mode mode = unmarshalMode(_mode);
        uint[] memory _certificateIds = new uint[](MAX_CERTIFICATIONS);

    if(mode == Mode.INSPECTOR){
        require(msg.sender == owner, "Action only allowed by Owner");
        Entity memory entity = Entity(_id,_name, mode, _certificateIds);
        entities[_id] = entity;
        entityIds.push(_id);
        emit AddEntity(entity.id, _mode, entity.name);

    }else{
        Entity memory entity = Entity(_id,_name, mode, _certificateIds);
        entities[_id] = entity;
        entityIds.push(_id);
        emit AddEntity(_id, _mode, entity.name);

    }

        
    } 

    function unmarshalMode(string memory _mode) private pure returns(Mode mode) {
        bytes32 encodedMode = keccak256(abi.encodePacked(_mode));
        bytes32 encodedMode0 = keccak256(abi.encodePacked("MANUFACTURER"));
        bytes32 encodedMode1 = keccak256(abi.encodePacked("INSPECTOR"));
        bytes32 encodedMode2 = keccak256(abi.encodePacked("SUPPLIER"));
        bytes32 encodedMode3 = keccak256(abi.encodePacked("CUSTOMER"));



        if(encodedMode == encodedMode0){
            return Mode.MANUFACTURER;
        }else if(encodedMode == encodedMode1){
            return Mode.INSPECTOR;
        }else if(encodedMode == encodedMode2){
            return Mode.SUPPLIER;
        }else if(encodedMode == encodedMode3){
            return Mode.CUSTOMER;
        }else{
            revert("Received invalid entity mode.");
        }
    }

   
    function addVehicle(string memory brand, address manufacturer, string memory _model, uint pricePreDecimal,uint  pricePostDecimal, string memory vin, string memory color, uint manufactured_year , string memory manufactured_city, string memory manufactured_country, string memory additional_comment ) public returns(string memory vehicleId) {

        uint[] memory _certificateIds = new uint[](MAX_CERTIFICATIONS);
        Vehicle memory autoVehicle = Vehicle(vin, brand, manufacturer, manufacturer, _model, pricePreDecimal, pricePostDecimal, color, manufactured_year, manufactured_city,manufactured_country, additional_comment,_certificateIds);
        vehicles[vin] = autoVehicle;
        vehicleIds.push(vin);
        emit AddVehicle(vin, autoVehicle.manufacturer);
        return vin;

    } 

    


    function purhcaseVehicle(string memory id, string memory vin, bytes memory sign, string memory message, uint timestamp) public payable returns(bool) {

        // Check if vehicle exists
        Vehicle memory autoVehicle = vehicles[id];
        // Set new owner
        autoVehicle.current_owner = msg.sender;
        vehicles[id] = autoVehicle;
    
        // new owner certificate
         issueCertificate(autoVehicle.manufacturer, autoVehicle.current_owner, "STORED" , autoVehicle.id, sign, message, timestamp);
        return true;
    }

    function purhcaseVehicleCustomer(string memory id,string memory vin, bytes memory sign, string memory message, address seller, uint timestamp) public {

        // Check if vehicle exists
        Vehicle memory autoVehicle = vehicles[id];
        
        // Set new owner
        autoVehicle.current_owner = msg.sender;
        vehicles[id] = autoVehicle;
    
        // new owner certificate
         issueCertificate(seller, msg.sender, "DELIVERED" , autoVehicle.id, sign, message, timestamp);
        
    }


    function issueCertificate(address _issuer, address _prover, string memory _status, string memory vehicleId, bytes memory signature, string memory message, uint timestamp) public returns(uint) {
        
        Entity storage issuer = entities[_issuer];
        Entity storage prover = entities[_prover];
        Status status = unmarshalStatus(_status);

        
        Certificate memory certificate = Certificate(certificateIds.length, issuer, prover, signature, status, message, timestamp);

        Vehicle storage autoVehicle = vehicles[vehicleId];
        certificateIds.push(certificateIds.length);
        certificates[certificateIds.length-1] = certificate;
        autoVehicle.certificateIds.push(certificateIds.length-1);
        vehicles[vehicleId] = autoVehicle;
        prover.certificateIds.push(certificateIds.length-1);
        issuer.certificateIds.push(certificateIds.length-1);
        entities[_issuer] = issuer;
        entities[_prover] = prover;

        emit IssueCertificate(_issuer, _prover, certificateIds.length-1, message);

        return certificateIds.length-1;

    }

    function unmarshalStatus(string memory _status) private pure returns(Status status) {


        bytes32 encodedStatus = keccak256(abi.encodePacked(_status));
        bytes32 encodedStatus0 = keccak256(abi.encodePacked("MANUFACTURED"));
        bytes32 encodedStatus1 = keccak256(abi.encodePacked("INSPECTED"));
        bytes32 encodedStatus2 = keccak256(abi.encodePacked("DELIVERING_TO_SUPPLIER"));
        bytes32 encodedStatus3 = keccak256(abi.encodePacked("STORED"));
        bytes32 encodedStatus4 = keccak256(abi.encodePacked("DELIVERING_TO_BUYER"));
        bytes32 encodedStatus5 = keccak256(abi.encodePacked("DELIVERED"));


        if(encodedStatus == encodedStatus0){
            return Status.MANUFACTURED;
        }else if(encodedStatus == encodedStatus1){
            return Status.INSPECTED;
        }else if(encodedStatus == encodedStatus2){
            return Status.DELIVERING_TO_SUPPLIER;
        }else if(encodedStatus == encodedStatus3){
            return Status.STORED;
        }else if(encodedStatus == encodedStatus4){
            return Status.DELIVERING_TO_BUYER;
        }else if(encodedStatus == encodedStatus5){
            return Status.DELIVERED;
        }else{
            revert("Received invalid certificate status.");
        }
    }


    function isMatchingSignature(bytes32 message, uint id, address issuer) public view returns(bool) {
        Certificate memory cert = certificates[id];
        require(cert.issuer.id == issuer, "Invalid issuer");

        address recoveredSigner = CryptoSuite.recoveredSigner(message, cert.signature);
        return recoveredSigner == cert.issuer.id;
    }



}