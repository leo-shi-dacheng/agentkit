# 要做的大模块
## cdp ```P1```
## erc20  ```P0```
- get_balance
- transfer ???
    - 使用 cdpWalletProvider 还是 evmWalletProvider 这是个问题
## erc721 ```done```
- get_balance
- mint
- transfer
## twitter ```done```
## wallet ```P0```
## whsk ```P1```
## wow ```P1```
- 部署脚本已经完成
- 测试网已经部署
- 其中的 uinswap 主网还没部署
## analytics 不支持

------------------
## walletProvider
所有钱包提供器的最基础抽象类 (abstract class) 或接口，规定了一个通用钱包操作需要实现的方法接口，比如 getAddress()、sendTransaction() 等
## evmWalletProvider  ```P0```
专门面向 EVM（以太坊虚拟机）兼容链的钱包提供器的抽象基类，继承自 ```walletProvider```。内部则规定了 EVM 中可能用到的签名、打包交易等通用方法。
## viemWalletProvider ```P1```
基于 viem（一个轻量级的 EVM RPC 库）实现的具体 EVM 钱包提供器，继承自 ```evmWalletProvider```。它内部会用 viem 的 WalletClient、PublicClient 等完成签名、发送交易、合约调用、获取交易回执等操作
## cdpWalletProvider
基于 Coinbase SDK 的“Smart Wallet”实现，继承自 ```evmWalletProvider``
## smartWalletProvider
基于 Coinbase SDK 的“Smart Wallet”实现，继承自 ```evmWalletProvider```，但内部使用了 Coinbase 提供的 createSmartWallet、User Operation 等智能账户功能
----------

# issue
1. cdpWalletProvider 新增功能
- 管理并签名交易（如 signTransaction、sendTransaction 等）
- 原生资产转账（nativeTransfer）
- 部署合约、发行 Token/NFT（deployToken、deployNFT、deployContract）
- 执行交易与读取合约（createTrade、readContract）
- Gasless 方式的 ERC20 转账（gaslessERC20Transfer）
- 导出并获取钱包（exportWallet、getWallet）

## 目前只支持 typescript, 还不支持 python
## 目前很多功能只支持 testnet 

修改 @coinbase/agentkit 为 @hashkey/agentkit
全局替换

@coinbase/agentkit-langchain 这个库在哪里


## 其他相关库
```coinbase-sdk-nodejs```: https://github.com/coinbase/coinbase-sdk-nodejs
```cdp-sdk```: https://github.com/coinbase/cdp-sdk


# 发布部署 npm 包
## @coinbase/agentkit 需要部署
## @coinbase/agentkit-langchain 目前还不用
## @coinbase/agentkit-model-context-protocol 目前还不用
