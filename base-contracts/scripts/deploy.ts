import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying from ${deployer.address}`);

    const Shop = await ethers.getContractFactory('Shop');
    const shop = await Shop.deploy();
    await shop.waitForDeployment();
    console.log(`Deployed Shop at ${await shop.getAddress()}`);

    const Products = await ethers.getContractFactory('Products');
    const products = await Products.deploy('base uri');
    await products.waitForDeployment();
    console.log(`Deployed Products at ${await products.getAddress()}`);

    const Warehouse = await ethers.getContractFactory('Warehouse');
    const warehouse = await Warehouse.deploy(await shop.getAddress(), await products.getAddress());
    await warehouse.waitForDeployment();
    const warehouseAddress = await warehouse.getAddress();
    console.log(`Deployed Warehouse at ${await warehouse.getAddress()}`);

    await shop.setWarehouse(warehouseAddress);
    await products.setWarehouse(warehouseAddress);
    console.log('Set Warehouse address into Shop and Products');

    const Picking = await ethers.getContractFactory('PickingRobot');
    const picking = await Picking.deploy(warehouseAddress);
    await picking.waitForDeployment();
    console.log(`Deployed Picking Robot at ${await picking.getAddress()}`);

    const Packing = await ethers.getContractFactory('PackingRobot');
    const packing = await Packing.deploy(warehouseAddress);
    await packing.waitForDeployment();
    console.log(`Deployed Packing Robot at ${await packing.getAddress()}`);

    const Delivery = await ethers.getContractFactory('DeliveryRobot');
    const delivery = await Delivery.deploy(warehouseAddress);
    await delivery.waitForDeployment();
    console.log(`Deployed Delivery Robot at ${await delivery.getAddress()}`);

    await warehouse.setRobot(await picking.getAddress());
    await warehouse.setRobot(await packing.getAddress());
    await warehouse.setRobot(await delivery.getAddress());
    console.log('Added Robots addresses into Warehouse');
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
