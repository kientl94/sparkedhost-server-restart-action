import got from "got";
import core from "@actions/core";

if (!core.getInput('PTE_PANEL_URL')) {
    core.error('No pterodactyl URL was supplied');
    process.exit(1);
}
if (!core.getInput('PTE_BEARER_TOKEN')) {
    core.error('No pterodactyl bearer token was supplied');
    process.exit(1);
}
if (!core.getInput('PTE_PANEL_ID')) {
    core.error('No pterodactyl panel ID was supplied');
    process.exit(1);
}

const url = `${core.getInput('PTE_PANEL_URL')}/api/client/servers/${core.getInput('PTE_PANEL_ID')}/power`;

async function run() {
    await got.post(url, {
        headers: {
            'Authorization': `Bearer ${core.getInput('PTE_BEARER_TOKEN')}`,
            'Content-Type': 'application/json'
        },
        json: {
            signal: "restart"
        }
    })
}
run()