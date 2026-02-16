
# StudyCoin DApp 📱
<img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" />  
A decentralized web application that rewards users with cryptocurrency for staying focused using their webcam activity.


*****

## 📌 What Is This?


FocusToken is a Web3 productivity app that:

- Tracks user focus via webcam and WebSocket-based activity monitoring.
- Awards 1 **FocusToken (FCS)** for every 60 seconds of continuous focus.
- Connects seamlessly with MetaMask.
- Mints tokens to the user's wallet.


## 🚀 Features

- 🧠 Focus Detection: Backend tracks whether you're focused or distracted.
- ⌛ Focus Time Tracker: UI displays total focused time in real-time.
- 💰 Crypto Rewards: Earn ERC-20 tokens for staying focused (minting live from Monday).
- 🔗 MetaMask Integration: Connect and receive tokens directly to your wallet.

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Python (WebSocket Server)
- **Blockchain**: Solidity + Remix + MetaMask (Polygon Amoy Testnet)
- **Smart Contract**: ERC-20 token via OpenZeppelin

---

## 📄 Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FocusToken is ERC20, Ownable {
    constructor() ERC20("FocusToken", "FCS") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

****
<img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" />  


