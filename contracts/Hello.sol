pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Hello {
    struct Theme {
        string[] data_header;
        string[] data;
        string specification;
        uint reward;
        string[] answer_header;
        uint limited_time;
    }
    struct Answer {
        uint theme_id;
        string data_hash;
        string data_secret_hash;
        address sender;
    }

    Theme[] public themes;
    Answer[] public answers;
    string public current_answer_hash;

    function defineTheme(
        string[] memory data_header,
        string[] memory data,
        string memory specification,
        uint reword,
        string[] memory answer_header
    ) public payable returns (uint) {
        themes.push(Theme(data_header, data, specification, reword, answer_header, now + 1 weeks));
        return themes.length;
    }

    function changeReward(uint theme_id, uint new_reward) public {
        themes[theme_id].reward = new_reward;
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

    function getData(uint theme_id) public view returns (string[] memory) {
        return themes[theme_id].data;
    }

    function postAnswer(
        uint theme_id,
        string memory data_hash,
        string memory data_secret_hash
        ) public {
        answers.push(Answer(theme_id, data_hash, data_secret_hash, msg.sender));
    }

    mapping (string => uint) hashCount;
    function getCurrentAnswer(uint theme_id) public returns (string memory) {
        string memory hash = "";
        uint max = 0;
        for (uint i = 0; i < answers.length; i++) {
            if (theme_id == answers[i].theme_id) {
                hashCount[answers[i].data_hash]++;
            }
        }
        for (uint i = 0; i < answers.length; i++) {
            if (theme_id == answers[i].theme_id && max < hashCount[answers[i].data_hash]) {
                max = hashCount[answers[i].data_hash];
                hash = answers[i].data_hash;
            }
        }
        current_answer_hash = hash;
        return current_answer_hash;
    }
}

