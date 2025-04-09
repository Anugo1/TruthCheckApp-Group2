// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TruthCheck {
    enum Verdict { Unverified, True, False }

    struct Claim {
        address submitter;
        Verdict verdict;
        address verifier;
        uint256 timestamp;
    }

    mapping(bytes32 => Claim) public claims;

    event ClaimSubmitted(bytes32 indexed claimHash, address indexed submitter);
    event ClaimVerified(bytes32 indexed claimHash, Verdict verdict, address indexed verifier);

    modifier onlyUnverified(bytes32 claimHash) {
        require(claims[claimHash].verdict == Verdict.Unverified, "Already verified");
        _;
    }

    function submitClaim(string memory claimText) external {
        bytes32 claimHash = keccak256(abi.encodePacked(claimText));
        Claim storage c = claims[claimHash];

        require(c.timestamp == 0, "Claim already exists");

        claims[claimHash] = Claim({
            submitter: msg.sender,
            verdict: Verdict.Unverified,
            verifier: address(0),
            timestamp: block.timestamp
        });

        emit ClaimSubmitted(claimHash, msg.sender);
    }

    function verifyClaim(string memory claimText, bool isTrue) external onlyUnverified(keccak256(abi.encodePacked(claimText))) {
        bytes32 claimHash = keccak256(abi.encodePacked(claimText));
        Claim storage c = claims[claimHash];

        require(c.timestamp != 0, "Claim not found");

        c.verdict = isTrue ? Verdict.True : Verdict.False;
        c.verifier = msg.sender;

        emit ClaimVerified(claimHash, c.verdict, msg.sender);
    }

    function getClaimStatus(string memory claimText) external view returns (Verdict, address, address, uint256) {
        bytes32 claimHash = keccak256(abi.encodePacked(claimText));
        Claim memory c = claims[claimHash];
        return (c.verdict, c.submitter, c.verifier, c.timestamp);
    }
}
