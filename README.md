
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

<div align="center">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td width="60%" valign="top" align="left">
        <h2 align="left">🕸️ Neural Network (Skill Domains)</h2>
        <table width="100%">
          <thead>
            <tr style="border: none;">
              <th align="left"><b>Layer</b></th>
              <th align="left"><b>Technologies & Frameworks</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Logic Shell</b></td>
              <td><img src="https://skillicons.dev/icons?i=java,cpp,python,dart,cs&theme=dark" /></td>
            </tr>
            <tr>
              <td><b>Interface Deck</b></td>
              <td><img src="https://skillicons.dev/icons?i=html,css,js,flutter,dotnet,nodejs" /></td>
            </tr>
            <tr>
              <td><b>Infrastructure</b></td>
              <td><img src="https://skillicons.dev/icons?i=firebase,github,vscode,androidstudio,blender" /></td>
            </tr>
            <tr>
              <td><b>Environment</b></td>
              <td><img src="https://skillicons.dev/icons?i=kali,linux,raspberrypi,windows,ubuntu" /></td>
            </tr>
          </tbody>
        </table>
      </td>
      <td width="40%" valign="middle" align="center">
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4cnR4bmR4bmR4bmR4bmR4bmR4bmR4bmR4bmR4bmR4bmR4bmR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/QUY2upAMnGKJWPL25B/giphy.gif" width="100%" style="border-radius: 10px; border: 2px solid #E21717; box-shadow: 0 0 15px #E21717;" />
        <br />
        <code>[SYSTEM_ANALYSIS_ACTIVE]</code>
      </td>
    </tr>
  </table>
</div>

<img src="https://i.imgur.com/dJ76osD.png" width="100%" height="8px" />

