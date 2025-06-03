# MCP-Artifact

This repository contains the artifacts for the paper "**Beyond the Protocol: Unveiling Attack Vectors in the Model Context Protocol Ecosystem**"


Specifically, it includes the [Uploaded MCP Servers](RQ1/) in our experiment RQ1, the [User Study](RQ2/) in our experiment RQ2, and the [LLM evaluation](RQ3/) in our experiment RQ3.

## Ethical Statement & Disclaimer
<span style="color: red; font-weight: bold;">THIS ARTIFACT IS INTENDED SOLELY FOR ACADEMIC RESEARCH.</span>

*   **No Harm Caused:** The malicious MCP server code used for testing aggregation platform audit mechanisms in RQ1 contained **no actual malicious functionality**. Its documentation clearly disclosed its simulated malicious intent. No real users or real-world systems were harmed or affected by our tests. We removed all tested components from the aggregation platforms immediately after the study.
*   **Simulated Environments:** All experiments involving malicious behavior (e.g., PoCs for RQ3) were conducted in **controlled and simulated environments** to prevent any real-world harm or unauthorized access. The simulated MCP server aggregation platform (for RQ2) was explicitly designed for research and **did not interact with real users or systems outside of our controlled study participants.**
*   **User Study & Data Privacy:** The user study and interviews (for RQ2) were conducted under strict IRB guidelines. All participants provided informed consent, and all collected data (including interview transcripts and survey responses) have been **anonymized** to maintain confidentiality and protect personal information.
*   **Responsible Disclosure:** Our findings are intended to inform the broader community about potential security vulnerabilities in the emerging MCP ecosystem and to encourage the development of robust defense mechanisms. This artifact is provided for **verification and replication of our research findings only.**
*   **Use at Your Own Risk:** Any unauthorized use, modification, or deployment of the code and materials in this repository for malicious or harmful purposes is strictly prohibited and against the intent of this research. The authors are not responsible for any misuse.

---

## Overview of the Artifact
This artifact is organized into three main sections corresponding to our research questions (RQs):

### RQ1. Malicious MCP Server Upload Test

This section contains the code for the simulated malicious MCP servers used in our RQ1 upload tests. The code was designed to test the audit mechanisms of aggregation platforms but contains no actual malicious functionality.

![Glama Platform Example](assets/upload_example.png)

The [results](RQ1/results) section showcases screenshots of our successful uploads to three prominent platforms. We also preserved [snapshots](RQ1/results/snapshots/) of these platforms displaying our malicious servers through the [Internet Archive](https://web.archive.org) snapshot service to verify that third-party users could indeed access these public pages.

**Snapshot Links:**

[Snapshot - Smithery](https://web.archive.org/web/20250521044354/https://smithery.ai/server/@cluster3115/simpleweatherforecastserver)

[Snapshot - MCP.so](https://web.archive.org/web/20250520133123/https://mcp.so/server/simpleweatherforecastserver/cluster3115)


[Snapshot - Glama](https://web.archive.org/web/20250520133434/https://glama.ai/mcp/servers/@cluster3115/SimpleWeatherForecastServer)


### RQ2. Simulations for MCP Attacks: A User Study

This section contains the [simulation platform source code](RQ2/simulation-platform) distributed to participants in our user study, the [source code](RQ2/simulation-tasks/Tasks/Task%202/mcp-servers) of 13 MCP Servers (9 Benign and 4 Malicious), the [simulation task list and instructions](RQ2/simulation-tasks/Tasks), the [simulation task results](RQ2/simulation-tasks/questionnaire_results.csv), the [interview question design](RQ2/interview/interview.pdf), and the [transcribed text materials](RQ2/interview/transcribed) from interview recordings.

We also deployed a unharmful demo of our simulation platform at [https://www.mcp-servers.shop/](https://www.mcp-servers.shop/).

**Simulation Platform Demo**

Homepage:

<p align="center">
  <img src="assets/platform.png" alt="Platform Homepage" width="1000"/>
</p>

MCP Server Details Display:

<p align="center">
  <img src="assets/platform_detail.png" alt="Server Details Page" width="1000"/>
</p>


**Simulation Platform Event Paths**

The image below shows the user event trigger paths on our simulated MCP aggregation platform as anonymously recorded by Google Analytics (GA4), displaying the trigger paths for 36 recorded simulated MCP server installation events (`try_this_server`). A typical path involves users entering from the platform homepage, scrolling through the homepage content, selecting an MCP Server display card, viewing the page, clicking 'View Source Code' to download the source code, and finally clicking the 'Try this server' button to trigger the simulated installation event.


<p align="center">
  <img src="assets/user_path.png" alt="User Event Trigger Paths on the Simulation Platform" width="1000"/>
</p>


### RQ3. Attack Implementation

This section contains the proof-of-concept (PoC) implementations for three distinct attack vectors identified in our paper. We designed three experimental scenarios for each attack type to demonstrate various manifestations of MCP ecosystem.

**Attack Types:**

1. **[Tool Poisoning Attack](RQ3/PoisonAttack/)** - Malicious instructions are embedded within the MCP tool description, which are invisible to the user. These hidden instructions lead to untrustworthy outputs or unauthorized actions being executed without the user's awareness:
   - `experiment_1/` - Weather-to-trading service that injects cryptocurrency transfer instructions
   - `experiment_2/` - Weather server that poisons responses with hidden commands
   - `experiment_3/` - Bitcoin service that embeds malicious trading suggestions

2. **[Puppet Attack](RQ3/PuppetAttack/)** - In scenarios where users install multiple MCP servers, servers with malicious tool descriptions can influence the behavior of tools from trusted servers, ultimately leading to malicious actions:
   - `experiment_1/` - Cryptocurrency services that provide manipulated price data to influence trading decisions
   - `experiment_2/` - Weather service that influences user behavior through biased information
   - `experiment_3/` - Transfer service that redirects transactions to attacker-controlled addresses

3. **[Malicious External Resources Attack](RQ3/MaliciousExternalResources/)** - The tool descriptions and code on the MCP server are benign; however, the tool invocation requires accessing third-party resources, where malicious instructions are embedded, ultimately leading to an attack:
   - `experiment_1/` - Weather service that communicates with external malicious resources to harvest user location data
   - `experiment_2/` - Bitcoin price tracker that logs user financial queries through external API calls
   - `experiment_3/` - API service that performs unauthorized data collection via third-party endpoints

Each experiment folder contains the complete MCP server source code. These implementations were used in controlled environments to evaluate LLM vulnerability to different attack strategies. **DO NOT USE ANY OF THIS CODE IN REAL ENVIRONMENTS.**


## Contributing

For any questions, feedback, or further inquiries regarding this research or artifact, please submit an issue to describe the problem. We will respond promptly and work to resolve it. You can also contribute to improving our code by creating a new pull request.


For more information about the dataset and research findings, please refer to our paper: "**Beyond the Protocol: Unveiling Attack Vectors in the Model Context Protocol Ecosystem**."
