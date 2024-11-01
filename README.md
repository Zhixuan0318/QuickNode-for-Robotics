<div align="center">
    <img src="https://github.com/user-attachments/assets/2b9191c6-cbb3-491f-a5ca-0bb7d64b73dd" width=100>
    <h1>QuickNode for Robotics</h1>
    <strong>Connecting Industrial Robotic Automation to the Blockchain with QuickNode Solutions.</strong>  
</div>

<br>

## Problems

Various industries implement robotics for automation workflow to reduce cost and boost productivity. However, centralisation is a problem when industries have a Web2-based robotic setup. Industries which have a complex supply chain are usually having isolated data systems, causing visibility gap, hard to track and trace, and also security concerns. To address the current challenges, is to let current industries setup transition to a blockchain-connected distributed data system, which robots on the Web2 layer able to leave a transparent operation trial on any blockchain which can be tracked. 
> For this, we will need a middleware acting as the **bridge** to connect the Web3 layer with the Web2 industrial robotic layer. 
### ⚔️ Key problem to tackle:
However, industrial robotic process automation (RPA) architecture is super complex, consisting of different components built with different environments and frameworks. It is challenging to connect everything to blockchain. Currently, we dont have any dev tooling in this space to facilitate the integration, requiring each industry to create their own custom middleware for connection. Time and cost consuming. This is what becomes the inspiration🔥
### 💡Our solution and inspiration:
We are launching **"QuickNode for Robotics"** as the first B2B Middleware-as-a-Service (MaaS) project to support industries in designing and developing custom API hubs that seamlessly connect their Robotic Process Automation (RPA) infrastructure to the blockchain with QuickNode solutions. The custom hub acts as a middleware, bridging the industry’s robotics automation systems with the blockchain layer and interacting with on-chain components. Our solution is crucial as it significantly reduces the cost and time required for industries to transition from traditional Web2 robotic setups to a Web3 robotic infrastructure.

## But, why we focus on using QuickNode 🤷‍♂️⬇️

**We have a good solution for the industries, but...** 
If we use a request-driven architecture to set up our middleware poses two main issues. First, it leads to data delivery inefficiency due to reliance on polling, which is not real-time, unreliable, and has high latency, making integration inconvenient. Second, it limits scalability, as scaling is complex and requires addressing high traffic or under-utilization challenges, driving up infrastructure costs.

## 💪 QuickNode have the solutions
- **✅ We use Quicknode Streams:**
as the blockchain data streaming solution which will actively push onchain data to the industry robotic setup in near real time, which is much more reliable and easy to integrate. Also, we able to setup filter which act as a listener to capture certain on-chain events log by our robotic setup.
- **✅ We use Quicknode Functions:**
to offload our robotic operations to a serverless infrastructure with functions which is more cost effective, scalable and easy to integrate. Plus, it is blockchain optimized, which means that we able to listen to a certain onchain events on our stream we setup and trigger a function (robotic operation).
  
## 🛠️ Implementation of QuickNode solutions in our demo
For demo, we created a **ecommerce-warehouse robotic setup**:
- 1️⃣ We created a stream which is the **order-status-listener**, capturing order status updates in the storefront contract, with a filter to the order status topic. So, it is to keep track of each stage of the order, and process it or assigning robots (with Chainlink VRF) when we don’t have one for a certain process. 
- 2️⃣ We also created a stream which is the **assign-robot-listener**, to capture Chainlink VRF fulfilment of each stage with a filter. So, it is to run simulations of pick, pack or delivering once a robot is assigned.
- 3️⃣ Order processing phase, the simulations of each operations, and all robot task assignments are powered by QuickNode Functions, connecting to respective Streams.

## Future Challenges

### ⚔️ Integration Challenges (Technical)

- **Cross-Industry Integration**: We targets multiple sectors, each with unique robotic automation frameworks and architectures. Connecting these systems to the blockchain layer is resource-intensive. To onboard more industries, we aim to introduce Web3 dev tools ecosystem for industrial robotics, an area where the current blockchain space lacks support. While this will be a gradual process, it's key to speeding up integration and driving adoption.
- **Data Privacy and Security**: Handling sensitive data on a public blockchain is a major concern. While our current prototype uses an on-off chain reference solution, we are exploring on-chain encryption and zero-knowledge proofs (ZKPs) for better scalability and security.
- **Scalability**: Layer 2 solution offers improvements in speed and cost, and we already use off-chain methods to reduce traffic. Moving forward, we’ll research architectures like microservices, event-driven, and cloud-based systems to enhance AutoBase's efficiency. The implementation of QuickNode Streams and QuickNode Functions had brought great improvement on our architecture design which will be bring forward in future advancement.

### ⚔️ Adoption Resistance (Non-Technical)

Although our project offers significant benefits, industries are often resistant to adopting new, complex technologies like blockchain, especially when their operations rely on highly reliable robotic systems. To address this, our team will focus on pilot programs, education, training, and demonstrating ROI to build client confidence. We plan to roll out the project in phases to showcase value before scaling up. Additionally, collaborating with industry partners and integrating with their existing systems offers a resource-efficient approach to adoption.
