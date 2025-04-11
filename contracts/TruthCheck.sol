// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TruthCheck is ERC20, Ownable {
    uint256 public constant REWARD_AMOUNT = 20 * 10**18;
    
    struct Claim {
        address submitter;
        string content;
        bool verified;
        string result;
    }
    
    mapping(string => Claim) public claims;
    mapping(address => uint256) public verifiedClaimsCount;
    string[] public allClaims;
    
    event ClaimSubmitted(address indexed submitter, string content);
    event ClaimVerified(address indexed submitter, string content, string result);
    
    constructor() ERC20("TruthToken", "TRUTH") Ownable(msg.sender) {}
    
    function submitClaim(string memory _content) external {
        require(claims[_content].submitter == address(0), "Claim exists");
        claims[_content] = Claim(msg.sender, _content, false, "");
        allClaims.push(_content);
        emit ClaimSubmitted(msg.sender, _content);
    }
    
    function verifyClaim(string memory _content, string memory _result) external {
        Claim storage claim = claims[_content];
        require(claim.submitter != address(0), "No claim");
        require(!claim.verified, "Already verified");
        
        claim.verified = true;
        claim.result = _result;
        verifiedClaimsCount[claim.submitter]++;
        _mint(claim.submitter, REWARD_AMOUNT);
        emit ClaimVerified(claim.submitter, _content, _result);
    }
    
    function getUserStats(address _user) external view returns (uint256 balance, uint256 verifiedClaims) {
        return (balanceOf(_user), verifiedClaimsCount[_user]);
    }
}