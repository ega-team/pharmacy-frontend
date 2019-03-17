pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Hello {
    struct Theme {
        string data_header;
        string data;
        string specification;
        uint reward;
        string answer_header;
        uint limited_time;
        bytes32 answer_hash;
    }
    struct Answer {
        uint theme_id;
        bytes32 data_hash;
        bytes32 data_secret_hash;
        address sender;
    }

    Theme[] public themes;
    Answer[] public answers;

    function defineTheme(
        string memory data_header,
        string memory data,
        string memory specification,
        string memory answer_header
    ) public payable returns (uint) {
        themes.push(Theme(data_header, data, specification, msg.value, answer_header, now + 1 weeks, bytes32("")));
        return themes.length;
    }

    function changeReward(uint theme_id) public payable {
        themes[theme_id].reward += msg.value;
    }

    function getAllTheme() public view returns (Theme[] memory) {
        return themes;
    }

    function getAceptedTheme() public view returns (Theme[] memory) {
        Theme[] memory accepted_themes = new Theme[](themes.length);
        uint index = 0;
        for (uint i = 0; i < themes.length; i++) {
            require(themes[i].limited_time > now);
            accepted_themes[index] = themes[i];
            index++;
        }
        return accepted_themes;
    }

    function getTheme(uint theme_id) public view returns (Theme memory) {
        return themes[theme_id];
    }

    function getData(uint theme_id) public view returns (string memory) {
        return themes[theme_id].data;
    }

    function getAnswerHash(uint theme_id) private view returns (bytes32) {
        return themes[theme_id].answer_hash;
    }

    function getReward(uint theme_id) private view returns (uint) {
        return themes[theme_id].reward;
    }

    function postAnswer(
        uint theme_id,
        string memory data_hash,
        string memory data_secret_hash
        ) public {
        answers.push(Answer(theme_id, stringToBytes32(data_hash), stringToBytes32(data_secret_hash), msg.sender));
    }

    mapping (bytes32 => uint) hashCount;
    function getCurrentAnswer(uint theme_id) public returns (bytes32) {
        bytes32 hash = "";
        uint max = 0;
        uint index = 0;
        for (uint i = 0; i < answers.length; i++) {
            if (theme_id == answers[i].theme_id) {
                hashCount[answers[i].data_hash]++;
            }
        }
        for (uint i = 0; i < answers.length; i++) {
            if (theme_id == answers[i].theme_id && max < hashCount[answers[i].data_hash]) {
                max = hashCount[answers[i].data_hash];
                hash = answers[i].data_hash;
                index = i;
            }
        }
        themes[index].answer_hash = hash;
        return hash;
    }

    function sendReward(
        uint theme_id,
        string memory answer_data,
        string memory secret_key
        ) public {

        require(getAnswerHash(theme_id) == keccak256(abi.encodePacked(answer_data)));
        bytes32 secret_hash = getSecretHashByThemeAndSender(theme_id, msg.sender);
        require(secret_hash == keccak256(abi.encodePacked(strConnect(answer_data, secret_key))));
        msg.sender.transfer(getReward(theme_id));
    }

    function isSameString(string memory origin, bytes32 target) private pure returns (bool) {
        return keccak256(abi.encodePacked(origin)) == keccak256(abi.encode(target));
    }

    function getSecretHashByThemeAndSender(uint theme_id, address sender) private returns (bytes32) {
        for (uint i = 0; i < answers.length; i++) {
            require(theme_id == answers[i].theme_id);
            require(sender == answers[i].sender);
            return answers[i].data_secret_hash;
        }
        return bytes32("");
    }

    function strConnect(string memory str1, string memory str2) private returns(string memory) {
        bytes memory strbyte1 = bytes(str1);
        bytes memory strbyte2 = bytes(str2);

        bytes memory str = new bytes(strbyte1.length + strbyte2.length);

        uint8 point = 0;

        for(uint8 i = 0; i < strbyte1.length; i++) {
            str[point] = strbyte1[i];
            point++;
        }
        for(uint8 i = 0; i < strbyte2.length; i++){
            str[point] = strbyte2[i];
            point++;
        }
        return string(str);
    }

    function stringToBytes32(string memory source) private returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
