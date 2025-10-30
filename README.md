# ICP Qualifier

## Current features

- Simple REST API (`/icp` and `/prospects`)
- OpenAI integration with GPT-5
- Scalable architecture
- Modern tooling (Deno, Deno Deploy, Hono, JSR)
- Minimal dependencies (Hono, OpenAI SDK, Zod)

## Planned features

- Persistence (already in place, but no implementation)
- With persistence comes a shareable link for ICPs
- Pluggable databases (pick between Postgres and Supabase)

## Setup

1. Clone the repo
1. Create `.env` file
1. `deno install`
1. `deno task start`
1. Enjoy!

## Deploy

My recommendation is to use Deno Deploy, as it makes the deployment process almost entirely automatic.

For all other purposes, follow your platform of choice's option for "self-hosted applications" (EC2 on AWS, for example)

## Endpoints

### `/icp`

Input format

```json
{
  "domain": "https://fly.io/"
}
```

<details>
<summary>Return format</summary>

```json
{
  "id": "fly-io",
  "title": "Fly.io - Developer-centric Edge PaaS",
  "description": "Fly.io operates a global application platform that lets developers deploy and run full-stack apps, containers, and databases close to end users. The company provides a CLI (flyctl), orchestration for lightweight VMs/containers, global load balancing, persistent volumes, private networking, and managed services (e.g., Fly Postgres) to support low-latency, geo-distributed deployments. Fly.io targets developer-centric edge and cloud infrastructure use cases, enabling teams to run production services across many regions without managing underlying cloud provider details.",
  "companySize": "1K",
  "stage": "SELF_SUSTAINED",
  "countries": ["Global"],
  "industries": ["Cloud computing", "Edge infrastructure"],
  "personas": [
    {
      "department": "Engineering",
      "role": "Application Developer",
      "painPoints": [
        "Need to deploy full-stack apps close to end users for low-latency experiences",
        "Desire simple tooling (CLI) to deploy containers and apps without managing cloud provider details",
        "Require managed databases and services to avoid operational overhead"
      ]
    },
    {
      "department": "Platform / Infrastructure",
      "role": "Platform Engineer",
      "painPoints": [
        "Orchestrating lightweight VMs/containers across many regions",
        "Providing global load balancing and private networking for geo-distributed services",
        "Managing persistent volumes and data locality for distributed applications"
      ]
    },
    {
      "department": "DevOps / SRE",
      "role": "Site Reliability Engineer",
      "painPoints": [
        "Running production services across many regions reliably",
        "Reducing operational complexity by leveraging managed services (e.g., Fly Postgres)",
        "Maintaining low-latency, geo-distributed deployments without deep cloud provider integration"
      ]
    },
    {
      "department": "Executive / Technology",
      "role": "CTO / Head of Engineering",
      "painPoints": [
        "Enabling developer teams to ship globally distributed applications quickly",
        "Avoiding the overhead of managing underlying cloud provider infrastructure",
        "Balancing performance (low latency) with operational simplicity and developer productivity"
      ]
    }
  ]
}
```

</details>

### `/prospects`

Input format

```json
{
  "domains": ["https://deno.com/", "https://oxide.computer/"],
  "icp": {
    /* Your generated ICP */
  }
}
```

<details>
<summary>Return format</summary>

```json
{
  "prospects": [
    {
      "company": {
        "name": "Deno",
        "domain": "https://deno.com/",
        "segment": "Edge runtime & serverless platform",
        "industry": "Cloud computing, Edge computing, Developer tools",
        "companySize": "1K",
        "description": "Deno (Deno Inc.) is the creator of the Deno runtime for JavaScript and TypeScript and operates Deno Deploy, a serverless edge platform for running JS/TS applications close to end users. Targets developer-focused tooling and edge-hosting use cases with runtime and deployment tooling."
      },
      "score": 40,
      "description": "Partial fit. Strong overlap on developer-centric and edge hosting use cases (same audience and low-latency goals), but Deno operates its own edge hosting/runtime (Deno Deploy) and developer tooling, making it more of a competitor or peer than a likely buyer of Fly.io’s managed edge PaaS. Potential for partnership or integration, but low likelihood as a core Fly.io customer."
    },
    {
      "company": {
        "name": "Oxide Computer Company",
        "domain": "https://oxide.computer/",
        "segment": "Enterprise server hardware & systems software",
        "industry": "Cloud computing, Infrastructure, Hardware",
        "companySize": "1K",
        "description": "Oxide Computer Company builds integrated server hardware and systems software to simplify running infrastructure in customer data centers and private clouds, focusing on appliances and tooling for enterprise and cloud operator environments."
      },
      "score": 20,
      "description": "Low fit. Oxide focuses on selling hardware and systems software for private data center and enterprise infrastructure—customers aiming to own/manage their infrastructure—while Fly.io sells a managed, developer-centric edge PaaS to avoid managing underlying infrastructure. There is limited overlap in target buyer needs; Oxide’s end customers might sometimes want managed edge platforms, but Oxide itself and its primary buyers are unlikely core Fly.io customers."
    }
  ]
}
```

</details>
