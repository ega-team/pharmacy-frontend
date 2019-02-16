pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Hello {
    struct Answer {
        uint theme_id;
        string[] data;
        address sender;
    }

    struct Theme {
        string[] data_header;
        string[] data;
        string specification;
        uint reward;
        string[] answer_header;
    }

    Theme[] public themes;
    Answer[] public answers;

    function defineTheme(
        string[] memory data_header,
        string[] memory data,
        string memory specification,
        uint reword,
        string[] memory answer_header
    ) public returns (uint) {
        themes.push(Theme(data_header,data,specification,reword,answer_header));
        return themes.length;
    }

    function getTheme(uint theme_id) public view returns (Theme memory) {
        return themes[theme_id];
    }

    function getData(uint theme_id) public view returns (string[] memory) {
        return themes[theme_id].data;
    }

    function postAnswer(uint theme_id, string[] memory data) public {
        answers.push(Answer(theme_id, data, msg.sender));
    }

    function changeReward(uint theme_id, uint new_reward) public {
        themes[theme_id].reward = new_reward;
    }
}

