
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
      <td width="50%" valign="top" align="left" style="padding-right: 10px;">
        <h3 align="left">🕸️ NEURAL NETWORK</h3>
        <table width="100%" style="border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #333;">
            <td align="left" padding="5px"><b>Logic</b></td>
            <td align="right"><img src="https://skillicons.dev/icons?i=java,cpp,python,dart,cs&theme=dark" height="30px" /></td>
          </tr>
          <tr style="border-bottom: 1px solid #333;">
            <td align="left" padding="5px"><b>Deck</b></td>
            <td align="right"><img src="https://skillicons.dev/icons?i=html,css,js,flutter,dotnet,nodejs" height="30px" /></td>
          </tr>
          <tr style="border-bottom: 1px solid #333;">
            <td align="left" padding="5px"><b>Core</b></td>
            <td align="right"><img src="https://skillicons.dev/icons?i=firebase,github,vscode,androidstudio,blender" height="30px" /></td>
          </tr>
          <tr>
            <td align="left" padding="5px"><b>OS</b></td>
            <td align="right"><img src="https://skillicons.dev/icons?i=kali,linux,raspberrypi,windows,ubuntu" height="30px" /></td>
          </tr>
        </table>
      </td>
      <td width="50%" valign="top" align="center" style="padding-left: 10px;">
        <h3 align="center">📡 SYSTEM SCAN</h3>
        <img src="https://media.tenor.com/Rq7iDzaJh4UAAAAM/spiderman-ps4-spiderman-ps5.gif" width="100%" style="border-radius: 10px; border: 2px solid #E21717; box-shadow: 0 0 15px #E21717;" />
        <p align="center">
          <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=14&pause=500&color=E21717&center=true&vCenter=true&width=200&lines=ANALYZING+CORE...;THREATS:+NONE;SUIT+READY..." alt="Status SVG" />
        </p>
      </td>
    </tr>
  </table>
</div>

<img src="https://i.imgur.com/dJ76osD.png" width="100%" height="8px" />
