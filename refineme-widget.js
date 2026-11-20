/**
 * DOES: Object-Oriented Global Studio Header (#ee-header), Footer (#ee-footer), and Non-Scrolling Web-App Shell
 *       (EvolveWebAppShell) for all Local AI Studio & Chakra Software Surfaces — Zero Exceptions.
 *       - Implements 3-tier OOP inheritance: ChakraNode -> ChakraProject -> EmployeeAgent.
 *       - Top bar (#ee-header) is a clean 1-row bar with ONLY:
 *           1. Left: Active-Chakra-colored EVOLVE EARTH + CHAKRA OS · <00 VOID .. 07 CROWN> · <WHERE YOU ARE> logo badge.
 *           2. Right: The 00 Void .. 07 Crown Chakra dropdown menu (all Studio Apps, Pickers, 100x Engines, Trading,
 *              Twilio, Handwriting, Sanctum, Oracle, Fuel :7871, Jev, Computer Use, Dashboards, Gallery, ComfyUI & n8n
 *              live inside the 0–7 Chakra menus).
 *       - EvolveWebAppShell systematizes every existing HTML page into a sleek, aligned 1-View-at-a-Time Web App:
 *           1. Locks #ee-header, #ee-webapp-bar, <main>, and #ee-footer to exact 1440px alignment (0px edge diff).
 *           2. Converts multi-section scrolling pages into instant 1-Section-at-a-Time Web-App Tabs (#ee-webapp-bar).
 *           3. Paginates card grids (> 6 cards) into 6-card (3x2) decks (.ee-grid-pager) and tall tables into paged
 *              views (.ee-table-pager) so users never have to scroll down endless walls of boxes.
 * IN:   Every local studio & chakra page (:7863, :8655, :8657, :7871, :7872, :7801..:7807).
 * OUT:  #ee-header, #ee-webapp-bar, #ee-footer, window.EE_CHAKRA_OS, and window.EE_WEBAPP_SHELL.
 * LAWS: local-ai\CLAUDE.md (100% styled by Approved chakras.css + chakras-v3.css + evolve-unified-theme.css).
 */
(function () {
  "use strict";
  if (window.__eeRefineMeOopV2) return;
  window.__eeRefineMeOopV2 = true;

  var AGENT_DASH_BASE = "http://127.0.0.1:8655/AGENT-DASH.html";

  /* ==========================================================================
     1. OBJECT-ORIENTED CLASS HIERARCHY: ChakraNode -> ChakraProject -> EmployeeAgent
     ========================================================================== */

  function ChakraNode(cfg) {
    this.num = cfg.num;
    this.slug = cfg.slug;
    this.name = cfg.name;
    this.hz = cfg.hz;
    this.gem = cfg.gem;
    this.summary = cfg.summary;
    this.projects = [];
  }

  ChakraNode.prototype.applyThemeToDocument = function () {
    var html = document.documentElement;
    html.setAttribute("data-chakra", this.slug);
    html.setAttribute("data-evolve-theme", this.slug);
    if (!html.getAttribute("data-strength")) {
      html.setAttribute("data-strength", "bright");
    }
  };

  ChakraNode.prototype.addProject = function (projCfg) {
    var proj = new ChakraProject(this, projCfg);
    this.projects.push(proj);
    return proj;
  };

  function ChakraProject(parentChakra, cfg) {
    ChakraNode.call(this, parentChakra);
    this.parentChakra = parentChakra;
    this.projectId = cfg.id;
    this.projectSlug = cfg.slug;
    this.projectName = cfg.name;
    this.projectSubtitle = cfg.subtitle;
    this.domain = cfg.domain || "";
    this.liveUrl = cfg.liveUrl || (AGENT_DASH_BASE + "?chakra=" + this.slug + "&project=" + cfg.slug + "&agent=ceo");
    this.isAppHub = !!cfg.isAppHub;
    this.employees = [];

    var roles = cfg.employees || ChakraProject.buildDefaultEmployees(this.slug, cfg.slug, cfg.name, cfg.specialistTitle, cfg.specialistTask);
    for (var i = 0; i < roles.length; i++) {
      this.employees.push(new EmployeeAgent(this, roles[i]));
    }
  }
  ChakraProject.prototype = Object.create(ChakraNode.prototype);
  ChakraProject.prototype.constructor = ChakraProject;

  ChakraProject.buildDefaultEmployees = function (chakraSlug, projSlug, projName, specTitle, specTask) {
    return [
      {
        role: "ceo",
        code: "CEO",
        title: "CEO · Strategy & Vision",
        dept: "Executive Leadership",
        modelToolset: "claude-opus-4-6.architect",
        costPool: "Claude Max 20x ($0 marginal)",
        mission: "Own #1 rollout priority, revenue targets, and Prepare-Only approval gates for " + projName + ".",
        tasks: [
          "Review weekly KPI scoreboard & approve outbound offers for " + projName,
          "Enforce strict Personal vs. Business separation & Zone 0 privacy",
          "Coordinate cross-department priorities between Marketing, Management, Ops & Tech"
        ]
      },
      {
        role: "cmo",
        code: "CMO",
        title: "CMO · Brand & Offer Architecture",
        dept: "Marketing Leadership",
        modelToolset: "gemini-2.5-pro.brand-strategist",
        costPool: "Google AI Studio Free ($0.00)",
        mission: "Lead positioning, conversion funnels, and Soul-aligned brand messaging for " + projName + ".",
        tasks: [
          "Approve offer hooks, landing page headlines & character-budget copy for " + projName,
          "Align all visuals with Approved chakras.css + chakras-v3.css tokens",
          "Review funnel conversion metrics & lead-magnet performance"
        ]
      },
      {
        role: "marketing",
        code: "MKT",
        title: "Marketing · Ads, UGC & Content",
        dept: "Marketing & Growth Execution",
        modelToolset: "flux1-dev + wan2.1-vace.ugc",
        costPool: "Local Dual-GPU Rig ($0.00)",
        mission: "Produce daily static ads, UGC video hooks, email sequences, and social posts for " + projName + ".",
        tasks: [
          "Generate 480p draft-to-master UGC video clips & static ad variations",
          "Publish SEO articles, social carousels & lead-capture assets into To-Review",
          "Track ad CTR, organic reach & email opt-in conversion rates"
        ]
      },
      {
        role: "management",
        code: "MGR",
        title: "Management · Project & Team Manager",
        dept: "Management & Coordination",
        modelToolset: "claude-sonnet-4-6.project-mgr",
        costPool: "Claude Max 20x ($0 marginal)",
        mission: "Manage daily sprint boards, SOP checklists, contractor/team handoffs, and deadlines for " + projName + ".",
        tasks: [
          "Run daily standup audit across all 10 employee agents in " + projName,
          "Unblock stalled deliverables & verify SOP compliance before review",
          "Maintain clean project runbooks and milestone tracker in Obsidian Vault"
        ]
      },
      {
        role: "coo",
        code: "COO",
        title: "COO · Operations & Delivery",
        dept: "Operations & Fulfillment",
        modelToolset: "qwen2.5-coder-32b.ops-engine",
        costPool: "OpenRouter :free ($0.00)",
        mission: "Run day-to-day client fulfillment, workflow automation, and turnaround SLA for " + projName + ".",
        tasks: [
          "Cut fulfillment cycle time via standardized templates & n8n webhooks",
          "Monitor intake queues, customer onboarding & delivery milestones",
          "Verify zero bottlenecks on the Single-Track Train execution queue"
        ]
      },
      {
        role: "cfo",
        code: "CFO",
        title: "CFO · Finance, Stripe & Token ROI",
        dept: "Finance & Return-on-Tokens",
        modelToolset: "deepseek-r1-free.cfo-ledger",
        costPool: "OpenRouter :free ($0.00)",
        mission: "Manage Stripe checkout links, unit economics, and $0.00 token routing for " + projName + ".",
        tasks: [
          "Verify all Stripe checkout links & pricing tiers for " + projName,
          "Enforce zero-cost model failover routing & track Return-on-Tokens (:7871)",
          "Keep business revenue ledgers strictly separated from Dedicated Taxes"
        ]
      },
      {
        role: "sales",
        code: "SALES",
        title: "Sales · Closing & Partnerships",
        dept: "Sales & Business Development",
        modelToolset: "llama-3.3-70b.sales-closer",
        costPool: "Groq / OpenRouter :free ($0.00)",
        mission: "Drive customer acquisition, partner onboarding, and pipeline follow-ups for " + projName + ".",
        tasks: [
          "Follow up on warm inquiries, audit requests & partnership leads",
          "Prepare proposal packets & onboarding checklists (Prepare-Only gate)",
          "Track progress toward Year-1 customer & partner milestones"
        ]
      },
      {
        role: "cto",
        code: "CTO",
        title: "CTO · Web, APIs & Infrastructure",
        dept: "Engineering & Security",
        modelToolset: "claude-sonnet-4-6.fullstack-cto",
        costPool: "Claude Max 20x ($0 marginal)",
        mission: "Maintain fast, secure pages, OOP PHP/Python backends, and automated backups for " + projName + ".",
        tasks: [
          "Enforce PublicBusinessChakraLayout / StudioUniversalLayout OOP chrome",
          "Run health checks on local ports, Cloudflare edge & Docker containers",
          "Archive superseded files to _archive\\<YYYY-MM-DD> with _FOLDER-LOG.txt"
        ]
      },
      {
        role: "qa",
        code: "QA",
        title: "QA & Care · Quality & Client Success",
        dept: "Quality Assurance & Customer Care",
        modelToolset: "gemini-2.5-flash.qa-inspector",
        costPool: "Google AI Studio Free ($0.00)",
        mission: "Inspect every output for character-budget compliance, visual polish, and client satisfaction in " + projName + ".",
        tasks: [
          "Audit pages against Character-Limit Box Budget Law & Zero Nested Scrollbars",
          "Triage To-Review thumbnails into Approved, Ugly (Keep Code), or TRASH",
          "Ensure every client or community member receives warm, timely care"
        ]
      },
      {
        role: "specialist",
        code: "SPEC",
        title: specTitle || ("Specialist · " + projName + " Domain Expert"),
        dept: "Domain Specialist",
        modelToolset: "local-dual-gpu.domain-specialist",
        costPool: "Local Dual-GPU Rig ($0.00)",
        mission: specTask || ("Execute specialized domain workflows and technical deliverables for " + projName + "."),
        tasks: [
          specTask || ("Deliver core specialized output for " + projName),
          "Maintain domain knowledge base & verified reference templates",
          "Sync completed specialist packets to the project vault lane"
        ]
      }
    ];
  };

  function EmployeeAgent(parentProject, roleCfg) {
    this.parentProject = parentProject;
    this.parentChakra = parentProject.parentChakra;
    this.num = parentProject.num;
    this.slug = parentProject.slug;
    this.name = parentProject.name;
    this.hz = parentProject.hz;
    this.gem = parentProject.gem;
    this.projectId = parentProject.projectId;
    this.projectSlug = parentProject.projectSlug;
    this.projectName = parentProject.projectName;
    this.role = roleCfg.role;
    this.code = roleCfg.code;
    this.title = roleCfg.title;
    this.dept = roleCfg.dept || "Department Agent";
    this.modelToolset = roleCfg.modelToolset || "claude-sonnet-4-6.agent";
    this.costPool = roleCfg.costPool || "$0.00 Zero-Cost Pool";
    this.mission = roleCfg.mission || "";
    this.tasks = roleCfg.tasks || [];
    this.customHref = roleCfg.href || "";
  }
  EmployeeAgent.prototype = Object.create(ChakraProject.prototype);
  EmployeeAgent.prototype.constructor = EmployeeAgent;

  EmployeeAgent.prototype.getDashUrl = function () {
    if (this.customHref) return this.customHref;
    var base = (window.location.port === "7863")
      ? "http://localhost:7863/AGENT-DASH.html"
      : AGENT_DASH_BASE;
    return base + "?chakra=" + encodeURIComponent(this.slug) +
           "&project=" + encodeURIComponent(this.projectSlug) +
           "&agent=" + encodeURIComponent(this.role);
  };

  /* ==========================================================================
     2. INSTANTIATE 00 VOID + 01..07 CHAKRAS -> PROJECTS & ALL STUDIO APPS
     ========================================================================== */
  var CHAKRA_DATA = [
    {
      num: "00", slug: "void", name: "00 Void", hz: "Unlimited Potential", gem: "Origination Picker",
      summary: "The Underlying Void of Unlimited Potential — YAY/NAY Picker, Model.Toolset & 100x Lab",
      projects: [
        {
          id: "V0", slug: "void-picker", name: "The Void Picker",
          subtitle: "YAY / NAY & Choose a Model.Toolset to Make It Happen",
          domain: "00-void.local",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Picker Architect · YAY / NAY & Model Router",
          specialistTask: "Triage unbloomed ideas, pages, images, videos, and audio with 1-click YAY / UGLY / NAY and route to the winning model.toolset."
        },
        {
          id: "V1", slug: "unbloomed-ideas", name: "Unbloomed Ideas & Prompts",
          subtitle: "Origination of New Ideas & Saved Prompts Queue",
          domain: "00-void.prompts",
          liveUrl: "http://127.0.0.1:8655/MERGED-APPROVED-FUNCTIONALITY-HUB.html#saved-prompts",
          specialistTitle: "Prompt Alchemist · Re-Run Good Prompts on New Models",
          specialistTask: "Preserve every good prompt from Ugly media outputs and test it across alternate local and zero-cost models before blooming into Chakras 01–07."
        },
        {
          id: "V2", slug: "functionality-merger", name: "Ugly-to-Approved Merger",
          subtitle: "Pulls Functionality From Ugly Pages Into Approved Designs",
          domain: "00-void.merger",
          liveUrl: "http://127.0.0.1:8655/MERGED-APPROVED-FUNCTIONALITY-HUB.html",
          specialistTitle: "Code Harvester · Functionality-Into-Approved Merger",
          specialistTask: "Extract JS functions, API endpoints, and interactive tables from Ugly-But-Awesome-Functionality pages and merge them into Approved Chakra designs."
        },
        {
          id: "S0", slug: "void-picker-apps", name: "Void Pickers, Model Hub & 100x Lab",
          subtitle: "Original __OG Picker, Live Picker, 100x Lab & By-Model Browser",
          isAppHub: true,
          liveUrl: "http://127.0.0.1:8655/BUSINESS-GENERATOR-TOOLSET-PICKER__OG.html",
          employees: [
            { role: "og-picker", code: "OG", title: "Model.Toolset Picker — Original (__OG :8655)", href: "http://127.0.0.1:8655/BUSINESS-GENERATOR-TOOLSET-PICKER__OG.html" },
            { role: "toolset-picker", code: "MODEL", title: "Model.Toolset Generator Picker (Live :8655)", href: "http://127.0.0.1:8655/BUSINESS-GENERATOR-TOOLSET-PICKER.html" },
            { role: "fun-100x", code: "100x", title: "100x Showcase & 20 Testnet Engines (:8655)", href: "http://127.0.0.1:8655/fun-projects-100x" },
            { role: "web-picker", code: "PICK", title: "Web Page & Chakra Picker (YAY / UGLY / NAY)", href: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html" },
            { role: "by-model", code: "COMFY", title: "By-Model Comfy Browser (68 Folders :7863)", href: "http://localhost:7863/BY-MODEL-COMFY-BROWSER.html" },
            { role: "approval-sheet", code: "SHEET", title: "Global Model Approval Sheet (:8655)", href: "http://127.0.0.1:8655/GLOBAL-MODEL-APPROVAL-SHEET.html" },
            { role: "merged-hub", code: "MERGE", title: "Merged Approved + Functionality Hub (:8655)", href: "http://127.0.0.1:8655/MERGED-APPROVED-FUNCTIONALITY-HUB.html" }
          ]
        }
      ]
    },
    {
      num: "01", slug: "root", name: "01 Root", hz: "396 Hz", gem: "Garnet",
      summary: "Foundation, Claims, Multi-Algo Trading, Twilio & Storm Safety",
      projects: [
        {
          id: "B1", slug: "closingclaims", name: "ClosingClaims",
          subtitle: "Claims & IA Firm · Grow 10x First",
          domain: "closingclaims.com",
          liveUrl: "http://127.0.0.1:8655/IPHONE-CLAIMS-ORGANIZER.html",
          specialistTitle: "Adjuster · Xactimate, GLR & LKQ Desk",
          specialistTask: "Draft Xactimate scopes, General Loss Reports (GLR), and Personal Property LKQ valuations."
        },
        {
          id: "B2", slug: "preprestore", name: "PrepRestore",
          subtitle: "Storm Prep, LiDAR Roof & $1B Loss Prevention",
          domain: "preprestore.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Storm & LiDAR · 14-Day HIEMA & Roof Baseline",
          specialistTask: "Run 14-day HIEMA storm-prep kit curation, LiDAR roof baselines, and vetted roofer rosters."
        },
        {
          id: "P1", slug: "personal-root", name: "Personal Root",
          subtitle: "#1 Priority Sadhana, Financial Mastery & Vitality",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8655/FINANCIAL-MASTERY-AND-TRADING-HUB.html",
          specialistTitle: "Sadhana & Vital Body · 7-Day Streak Coach",
          specialistTask: "Track morning spirit walk, 1-hr yoga/meditation sadhana, 100 push-ups / 20 pull-ups, and Financial Mastery."
        },
        {
          id: "S1", slug: "root-studio-apps", name: "Root Claims, Trading & Twilio Apps",
          subtitle: "Multi-Algo Trading, SPY Backtest, Twilio & Claims :8655",
          isAppHub: true,
          liveUrl: "http://127.0.0.1:8655/FINANCIAL-MASTERY-AND-TRADING-HUB.html",
          employees: [
            { role: "trading-hub", code: "ALGO", title: "Multi-Algo Trading Hub (Beat Buy & Hold :8655)", href: "http://127.0.0.1:8655/FINANCIAL-MASTERY-AND-TRADING-HUB.html" },
            { role: "sidestep-tuner", code: "TUNE", title: "Sidestep & Beat Buy-and-Hold Tuner (:8655)", href: "http://127.0.0.1:8655/BEAT-BUY-AND-HOLD-TUNER.html" },
            { role: "spy-backtest", code: "SPY", title: "Multi-Timeframe SPY Backtest Proof (:8655)", href: "http://127.0.0.1:8655/MULTI-TIMEFRAME-SPY-BACKTEST.html" },
            { role: "twilio-caller", code: "TWILIO", title: "Oahu Camera-Battery Twilio Test #1 (:8655)", href: "http://127.0.0.1:8655/OAHU-CAMERA-BATTERY-TWILIO-CALLER.html" },
            { role: "claims-app", code: "CLAIMS", title: "Claims Intake & Organizer (:8655)", href: "http://127.0.0.1:8655/IPHONE-CLAIMS-ORGANIZER.html" },
            { role: "all-ports", code: "PORTS", title: "All Apps & Ports Directory (:7863)", href: "http://localhost:7863/NESTED-PORT-AND-SOFTWARE-SHORTCUTS.html" },
            { role: "master-drive", code: "DRIVE", title: "Desktop Master Drive Console (:7863)", href: "http://localhost:7863/DESKTOP-MASTER-DRIVE-CONSOLE.html" },
            { role: "root-testnet", code: "7801", title: "01 Root Local Testnet Server (:7801)", href: "http://127.0.0.1:7801/" }
          ]
        }
      ]
    },
    {
      num: "02", slug: "sacral", name: "02 Sacral", hz: "417 Hz", gem: "Coral",
      summary: "Sacred Union, Retreats, ComfyUI & Creative Flow",
      projects: [
        {
          id: "B3", slug: "tantricunity", name: "Tantric Unity",
          subtitle: "12-Master Council & Somatic Retreat Festivals",
          domain: "tantricunity.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Retreat & Ethics · 12-Master Council Steward",
          specialistTask: "Coordinate the council of 12 Tantra masters, 7–9 retreat organizers, and shared safety/consent ethics code."
        },
        {
          id: "B4", slug: "hibalove", name: "Hi Ba Love",
          subtitle: "7 Chakra Breakthrough Rooms & Speed Dating",
          domain: "hibalove.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Room Host · 7 Breakthrough Rooms Facilitator",
          specialistTask: "Facilitate the 7 chakra breakthrough rooms and conscious online speed dating on Cloudflare Pages."
        },
        {
          id: "P2", slug: "personal-sacral", name: "Personal Sacral (Zone 0)",
          subtitle: "20m Daily Dance, Intimacy & Creative Play",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8655/AGENT-DASH.html?chakra=sacral&project=personal-sacral&agent=ceo",
          specialistTitle: "Movement & Play · 20m Daily Dance Steward",
          specialistTask: "Protect Zone 0 sacred intimacy, 20-minute daily ecstatic movement, and creative play."
        },
        {
          id: "S2", slug: "sacral-studio-apps", name: "Sacral Creative & ComfyUI Apps",
          subtitle: "ComfyUI :8188, Workflow Picker & 13 UX Designs",
          isAppHub: true,
          liveUrl: "http://127.0.0.1:8188/",
          employees: [
            { role: "comfyui", code: "GPU", title: "ComfyUI Local GPU Studio (:8188)", href: "http://127.0.0.1:8188/" },
            { role: "comfy-picker", code: "WF", title: "Comfy Output & Workflow Picker (:8655)", href: "http://127.0.0.1:8655/COMFY-OUTPUT-PICKER.html" },
            { role: "ux-designs", code: "UX", title: "13 Chakra UX Designs & Stylesheet Review (:7863)", href: "http://localhost:7863/PAPER-CHAKRA-UX-REVIEW-AND-CLIPBOARD-BRIDGE.html" },
            { role: "sacral-testnet", code: "7802", title: "02 Sacral Local Testnet Server (:7802)", href: "http://127.0.0.1:7802/" }
          ]
        }
      ]
    },
    {
      num: "03", slug: "solar", name: "03 Solar", hz: "528 Hz", gem: "Gold",
      summary: "Elemental Fire, n8n Automations, Single-Track Train & Taxes",
      projects: [
        {
          id: "B5", slug: "poweryogadiet", name: "Power Yoga Diet",
          subtitle: "5-Elemental System & Monthly Oahu Gatherings",
          domain: "poweryogadiet.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Elemental Guide · 7 Gathering Leaders & Potluck",
          specialistTask: "Organize monthly Oahu elemental gatherings (Earth, Air, Fire, Water, Space) toward 108 attendees."
        },
        {
          id: "T1", slug: "dedicated-taxes", name: "Dedicated Taxes (Zone 0)",
          subtitle: "Isolated CPA Package, Schedule C & Claim Mileage",
          domain: "Zone 0 Isolated",
          liveUrl: "http://127.0.0.1:8655/AGENT-DASH.html?chakra=solar&project=dedicated-taxes&agent=cfo",
          specialistTitle: "CPA & Tax Specialist · Schedule C / 1099 / Mileage",
          specialistTask: "Keep all Schedule C, 1099, K-1, catastrophe deployment mileage, and Quicken ledgers strictly isolated."
        },
        {
          id: "P3", slug: "personal-solar", name: "Personal Solar",
          subtitle: "Willpower, Athletic Fire & Daily Execution",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8655/AGENT-DASH.html?chakra=solar&project=personal-solar&agent=ceo",
          specialistTitle: "Athletic Fire · 5-Min Mile & 8% Body Fat Coach",
          specialistTask: "Track solar vitality, clean elemental nutrition, and disciplined single-track execution."
        },
        {
          id: "S3", slug: "solar-studio-apps", name: "Solar Automations, n8n & Train Apps",
          subtitle: "n8n :5678, n8n Gallery, Train Conductor & 100 Automations",
          isAppHub: true,
          liveUrl: "http://127.0.0.1:8655/N8N-WORKFLOW-GALLERY-AND-LAUNCHER.html",
          employees: [
            { role: "n8n-gallery", code: "N8N", title: "n8n Workflow Gallery & Launcher (:8655)", href: "http://127.0.0.1:8655/N8N-WORKFLOW-GALLERY-AND-LAUNCHER.html" },
            { role: "n8n-live", code: "5678", title: "n8n Live Automation Editor (:5678)", href: "http://127.0.0.1:5678/" },
            { role: "train-conductor", code: "TRAIN", title: "Single-Track GPU Train Conductor (:8655)", href: "http://127.0.0.1:8655/SINGLE-TRACK-TRAIN-CONDUCTOR.html" },
            { role: "automations", code: "100x", title: "100 4-Link Goal Automations (:7871)", href: "http://127.0.0.1:7871/FOUR-LINKS-100-AUTOMATIONS.html" },
            { role: "solar-testnet", code: "7803", title: "03 Solar Local Testnet Server (:7803)", href: "http://127.0.0.1:7803/" }
          ]
        }
      ]
    },
    {
      num: "04", slug: "heart", name: "04 Heart", hz: "639 Hz", gem: "Emerald",
      summary: "OSHNA 501(c)(3), Master Media Gallery & Deep Listening",
      projects: [
        {
          id: "B6", slug: "oshna", name: "OSHNA 501(c)(3)",
          subtitle: "Free Monthly Deep-Listening Circles & Daily Journey",
          domain: "oshna.org",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Circle Facilitator · 108 Listeners & Board Steward",
          specialistTask: "Coordinate monthly free deep-listening circles (108 participants in year 1) and 3–5 founding board stewards."
        },
        {
          id: "P4", slug: "personal-heart", name: "Personal Heart",
          subtitle: "Chosen Family, Ancestry & Unconditional Love",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8655/AGENT-DASH.html?chakra=heart&project=personal-heart&agent=ceo",
          specialistTitle: "Ancestry & Family · Genealogy & Heart Steward",
          specialistTask: "Nurture chosen family connections, ancestry research, and heart-centered presence."
        },
        {
          id: "S4", slug: "heart-studio-apps", name: "Heart Gallery, River & Curation Apps",
          subtitle: "Master AI Gallery :7863, Media River & Curation",
          isAppHub: true,
          liveUrl: "http://localhost:7863/GALLERY.html",
          employees: [
            { role: "ai-gallery", code: "GAL", title: "Master AI Media Gallery (:7863/GALLERY.html)", href: "http://localhost:7863/GALLERY.html" },
            { role: "media-river", code: "RIVER", title: "Curated Media River (:7863/river)", href: "http://localhost:7863/river" },
            { role: "web-picker", code: "PICK", title: "Web & Chakra YAY/NAY Picker (:8655)", href: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html" },
            { role: "heart-testnet", code: "7804", title: "04 Heart Local Testnet Server (:7804)", href: "http://127.0.0.1:7804/" }
          ]
        }
      ]
    },
    {
      num: "05", slug: "throat", name: "05 Throat", hz: "741 Hz", gem: "Sapphire",
      summary: "SEO Web & Video, Handwriting Reader, Dashboards & Voice",
      projects: [
        {
          id: "B7", slug: "seowebandvideo", name: "SEO Web & Video",
          subtitle: "First 3 Paying Clients & 108 Videos Optimized",
          domain: "seowebandvideo.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Video SEO · Long-to-Short Clip & Schema Engineer",
          specialistTask: "Optimize 108 client videos with Whisper captions, semantic chapters, and high-converting web pages."
        },
        {
          id: "P5", slug: "personal-throat", name: "Year-End Album & Memoir",
          subtitle: "1 Song/Week, Overtone Singing & Handwritten Notebooks",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8657/",
          specialistTitle: "Vocal & Memoir · Songwriting & Notebook Archivist",
          specialistTask: "Produce 1 original song per week toward the Year-End Album and transcribe handwritten notebooks into the Sovereign Lineage Memoir."
        },
        {
          id: "S5", slug: "throat-studio-apps", name: "Handwriting App, Dashboards & Studio Shell",
          subtitle: "Handwriting Trainer :8657, All Dashboards :7863 & Portal",
          isAppHub: true,
          liveUrl: "http://127.0.0.1:8657/",
          employees: [
            { role: "handwriting-8657", code: "WRITE", title: "Handwriting Reader — Draft-to-Truth (:8657)", href: "http://127.0.0.1:8657/" },
            { role: "handwriting-8655", code: "OCR", title: "Handwriting & Journal OCR App (:8655)", href: "http://127.0.0.1:8655/HANDWRITING-TO-TEXT-APP.html" },
            { role: "all-dashes", code: "DASH", title: "All Dashboards Master Hub (:7863)", href: "http://localhost:7863/DASHBOARD-OF-ALL-DASHBOARDS.html" },
            { role: "portal", code: "PORTAL", title: "Evolve Studio Main Portal (:7863/portal)", href: "http://localhost:7863/portal" },
            { role: "golden-rays", code: "RAYS", title: "100 Golden Rays Revenue Hub (:7863)", href: "http://localhost:7863/UNIVERSAL-HEADER-100-GOLDEN-RAYS.html" },
            { role: "throat-testnet", code: "7805", title: "05 Throat Local Testnet Server (:7805)", href: "http://127.0.0.1:7805/" }
          ]
        }
      ]
    },
    {
      num: "06", slug: "thirdeye", name: "06 Third Eye", hz: "852 Hz", gem: "Indigo",
      summary: "Best of Must Have, Studio Oracle, Fuel :7871 & AI Agents",
      projects: [
        {
          id: "B8", slug: "bestofmusthave", name: "Best of Must Have",
          subtitle: "21 Chakra.Dosha Curated Collections · 108 Sales",
          domain: "bestofmusthave.com",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Curator · 21 Chakra.Dosha Collection Buyer",
          specialistTask: "Curate the 21 chakra.dosha product collections and drive the first 108 sales."
        },
        {
          id: "P6", slug: "personal-thirdeye", name: "Quiet Block & Biofeedback",
          subtitle: "HRV/EEG Telemetry, Intuition & Pattern Sight",
          domain: "Zone 0 Private",
          liveUrl: "http://127.0.0.1:8655/AGENT-DASH.html?chakra=thirdeye&project=personal-thirdeye&agent=ceo",
          specialistTitle: "Biofeedback · HeartMath HRV & EEG Analyst",
          specialistTask: "Protect daily quiet blocks and correlate HRV/EEG biofeedback with deep creative insight."
        },
        {
          id: "S6", slug: "thirdeye-studio-apps", name: "Oracle, Fuel :7871, Jev & AI Control Apps",
          subtitle: "Oracle :7863, Fuel :7871, Talk to Jev, Computer Use & Bridge",
          isAppHub: true,
          liveUrl: "http://localhost:7863/oracle",
          employees: [
            { role: "oracle", code: "ORACLE", title: "Studio Oracle & Designer Teams (:7863/oracle)", href: "http://localhost:7863/oracle" },
            { role: "fuel-hub", code: "FUEL", title: "Fuel Hub & Free API Credit Hunter (:7871)", href: "http://127.0.0.1:7871/FUEL-HUB.html#burn-desk" },
            { role: "quota-harvester", code: "QUOTA", title: "Daily Quota & Allowance Harvester (:8655)", href: "http://127.0.0.1:8655/DAILY-QUOTA-HARVESTER.html" },
            { role: "talk-to-jev", code: "JEV", title: "Talk to Jev Decision Portal (:7863/jev)", href: "http://localhost:7863/jev" },
            { role: "computer-use", code: "DESK", title: "Claude Computer-Use & Task App (:8655)", href: "http://127.0.0.1:8655/CLAUDE-COMPUTER-USE-AND-TASK-APP.html" },
            { role: "context-bridge", code: "AGY", title: "Claude <-> Antigravity Bridge (:8655)", href: "http://127.0.0.1:8655/CLAUDE-ANTIGRAVITY-CONTEXT-BRIDGE.html" },
            { role: "thirdeye-testnet", code: "7806", title: "06 Third Eye Local Testnet Server (:7806)", href: "http://127.0.0.1:7806/" }
          ]
        }
      ]
    },
    {
      num: "07", slug: "crown", name: "07 Crown", hz: "963 Hz", gem: "Amethyst",
      summary: "One True DAO, Evolve Earth & Soul Signature Sanctum",
      projects: [
        {
          id: "B9", slug: "onetruedao", name: "One True DAO",
          subtitle: "Frozen Core Governance · 1,008 Global Validators",
          domain: "onetruedao.org",
          liveUrl: "http://127.0.0.1:8655/WEB-PAGE-AND-CHAKRA-PICKER.html",
          specialistTitle: "Protocol Architect · Frozen Core & Promise Bonds",
          specialistTask: "Maintain the incorruptible Frozen Core (stake, verify, release/penalize) with zero AI authority and no master keys."
        },
        {
          id: "B10", slug: "evolveearth", name: "Evolve Earth Umbrella",
          subtitle: "Soul Signature Quiz (1,008 Takers) & 100 Trees",
          domain: "evolveearth.com",
          liveUrl: "http://localhost:7863/soul",
          specialistTitle: "Reforestation & Soul Quiz · Iowa & Big Island",
          specialistTask: "Grow the Soul Signature chakra.dosha healing quiz to 1,008 takers and plant 100 trees in year one."
        },
        {
          id: "S7", slug: "crown-studio-apps", name: "Soul Signature Sanctum & Spirit Clock",
          subtitle: "Soul Quiz :7863/soul, Sanctum :7863/sanctum & Clock",
          isAppHub: true,
          liveUrl: "http://localhost:7863/sanctum",
          employees: [
            { role: "soul-quiz", code: "SOUL", title: "Soul Signature Imprint Quiz (:7863/soul)", href: "http://localhost:7863/soul" },
            { role: "sanctum", code: "SANCTUM", title: "7-Chakra Healing Sanctum (:7863/sanctum)", href: "http://localhost:7863/sanctum" },
            { role: "spirit-clock", code: "CLOCK", title: "Spirit Walk & Sadhana Clock (:7863/clock)", href: "http://localhost:7863/clock" },
            { role: "ceo-roundtable", code: "CEO", title: "CEO Roundtable 100x Hub (:7863)", href: "http://localhost:7863/CEO-ROUNDTABLE-100X-HUB.html" },
            { role: "crown-testnet", code: "7807", title: "07 Crown Local Testnet Server (:7807)", href: "http://127.0.0.1:7807/" }
          ]
        }
      ]
    }
  ];

  var CHAKRA_NODES = [];
  var CHAKRA_BY_SLUG = {};
  for (var cIdx = 0; cIdx < CHAKRA_DATA.length; cIdx++) {
    var rawC = CHAKRA_DATA[cIdx];
    var node = new ChakraNode(rawC);
    for (var pIdx = 0; pIdx < rawC.projects.length; pIdx++) {
      node.addProject(rawC.projects[pIdx]);
    }
    CHAKRA_NODES.push(node);
    CHAKRA_BY_SLUG[node.slug] = node;
  }

  window.EE_CHAKRA_OS = {
    ChakraNode: ChakraNode,
    ChakraProject: ChakraProject,
    EmployeeAgent: EmployeeAgent,
    chakras: CHAKRA_NODES,
    bySlug: CHAKRA_BY_SLUG,
    findAgent: function (chakraSlug, projectSlug, agentRole) {
      var ch = CHAKRA_BY_SLUG[(chakraSlug || "").toLowerCase()] || CHAKRA_NODES[0];
      var proj = ch.projects[0];
      for (var i = 0; i < ch.projects.length; i++) {
        if (ch.projects[i].projectSlug === projectSlug || ch.projects[i].projectId.toLowerCase() === (projectSlug || "").toLowerCase()) {
          proj = ch.projects[i];
          break;
        }
      }
      var emp = proj.employees[0];
      for (var j = 0; j < proj.employees.length; j++) {
        if (proj.employees[j].role === agentRole) {
          emp = proj.employees[j];
          break;
        }
      }
      return { chakra: ch, project: proj, agent: emp };
    }
  };

  /* ==========================================================================
     3. DETECT ACTIVE PAGE CHAKRA & SHORT PAGE LOCATION BADGE
     ========================================================================== */
  function detectPageChakraSlug() {
    var params = new URLSearchParams(window.location.search || "");
    var qCh = (params.get("chakra") || "").toLowerCase().trim();
    if (CHAKRA_BY_SLUG[qCh]) return qCh;

    var port = String(window.location.port || "");
    var portMap = { "7801": "root", "7802": "sacral", "7803": "solar", "7804": "heart", "7805": "throat", "7806": "thirdeye", "7807": "crown", "8657": "throat" };
    if (portMap[port]) return portMap[port];

    var p = ((window.location.pathname || "") + " " + (document.title || "")).toLowerCase();
    if (/00[\s_-]*void|web-page-and-chakra-picker|business-generator-toolset-picker|global-model-approval-sheet|by-model-comfy|merged-approved-functionality|fun-projects-100x/.test(p)) return "void";
    if (/02[\s_-]*sacral|tantric|hibalove|comfy-output-picker/.test(p)) return "sacral";
    if (/03[\s_-]*solar|poweryogadiet|tax|100-automations|n8n|train-conductor/.test(p)) return "solar";
    if (/04[\s_-]*heart|oshna|gallery|\/river\b/.test(p)) return "heart";
    if (/05[\s_-]*throat|seowebandvideo|dashboard-of-all-dashboards|handwriting|golden-rays/.test(p)) return "throat";
    if (/06[\s_-]*third|bestofmusthave|\/oracle\b|fuel|\/jev\b|computer-use|context-bridge|quota/.test(p)) return "thirdeye";
    if (/07[\s_-]*crown|onetruedao|\/sanctum\b|\/soul\b|\/clock\b|ceo-roundtable/.test(p)) return "crown";

    var htmlAttr = (document.documentElement.getAttribute("data-chakra") || "").toLowerCase().trim();
    if (CHAKRA_BY_SLUG[htmlAttr]) return htmlAttr;
    return "root";
  }

  function detectShortPageLocation() {
    var raw = "";
    var h1 = document.querySelector("main h1, .hero h1, .bp-block h1, h1");
    if (h1 && h1.textContent) {
      raw = h1.textContent.trim();
    } else if (document.title) {
      raw = document.title.trim();
    } else {
      raw = (window.location.pathname || "/").replace(/^\/+|\/+$/g, "");
    }
    raw = raw
      .replace(/^[^\w\d]+/, "")
      .replace(/\s*[—–|-]\s*.*$/, "")
      .replace(/\s*·\s*Port\s*\d+$/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!raw) raw = "STUDIO APP";
    if (raw.length > 26) raw = raw.slice(0, 25).trim() + "…";
    return raw.toUpperCase();
  }

  function closeAllHeaderMenus(exceptChakraDetails) {
    var hdr = document.getElementById("ee-header");
    if (!hdr) return;
    var openTop = hdr.querySelectorAll("details.ee-ch-menu[open]");
    for (var i = 0; i < openTop.length; i++) {
      if (openTop[i] !== exceptChakraDetails) {
        openTop[i].removeAttribute("open");
      }
    }
  }

  function closeSiblingProjects(parentDropdown, exceptProjDetails) {
    if (!parentDropdown) return;
    var openProjs = parentDropdown.querySelectorAll("details.ee-l2-proj[open]");
    for (var i = 0; i < openProjs.length; i++) {
      if (openProjs[i] !== exceptProjDetails) {
        openProjs[i].removeAttribute("open");
      }
    }
  }

  function stripDuplicatePageChrome() {
    var legacySelectors = [
      "nav.rooms",
      ".site-header:not(#ee-header)",
      ".ee-universal-header:not(#ee-header)",
      "#ee-universal-header",
      "#ee-global-self-improve-footer",
      ".ee-pf:not(#ee-footer)"
    ];
    for (var i = 0; i < legacySelectors.length; i++) {
      var nodes = document.querySelectorAll(legacySelectors[i]);
      for (var j = 0; j < nodes.length; j++) {
        if (nodes[j] && nodes[j].parentNode) {
          nodes[j].parentNode.removeChild(nodes[j]);
        }
      }
    }
  }

  /* ==========================================================================
     4. RENDER THE CLEAN 1-ROW GLOBAL HEADER (#ee-header)
        Left: EVOLVE EARTH + CHAKRA OS · <00 VOID..07 CROWN> · <WHERE YOU ARE>
        Right: 00 Void .. 07 Crown Chakra Menu (all tools/apps inside 0..7)
     ========================================================================== */
  function renderHeader(activeSlugOverride, keepOpenSelector) {
    stripDuplicatePageChrome();

    var activeSlug = activeSlugOverride || detectPageChakraSlug();
    var activeChakra = CHAKRA_BY_SLUG[activeSlug] || CHAKRA_NODES[0];
    activeChakra.applyThemeToDocument();
    var whereAmI = detectShortPageLocation();

    var h = document.getElementById("ee-header");
    if (!h) {
      h = document.createElement("header");
      h.id = "ee-header";
      h.setAttribute("role", "banner");
      document.body.insertBefore(h, document.body.firstChild);
    }
    h.setAttribute("data-hdr-opt", "C");

    var html = '<div class="ee-hdr-wrap">';
    html += '<div class="ee-hdr-top">';

    /* Left: Brand + Active Chakra OS & Location Badge ("the little logo thing that tells you where you are") */
    html += '<div class="ee-hdr-brand-cluster">';
    html += '<a class="ee-brand" href="http://localhost:7863/portal" title="Evolve Earth Local AI Studio — Active Chakra: ' + activeChakra.name + ' (' + activeChakra.hz + ' · ' + activeChakra.gem + ') · Current App: ' + whereAmI + '">';
    html += '<span>EVOLVE EARTH</span>';
    html += '<span class="ee-os-badge">' + activeChakra.name.toUpperCase() + ' · ' + whereAmI + '</span>';
    html += '</a>';
    html += '</div>';

    /* Right: 00 Void .. 07 Crown Menus (contains all Projects, Employee Dashes & Studio Apps) */
    html += '<nav class="ee-ch-bar" aria-label="00 Void to 07 Crown Chakra Menus">';
    for (var i = 0; i < CHAKRA_NODES.length; i++) {
      var ch = CHAKRA_NODES[i];
      var isCurrent = (ch.slug === activeChakra.slug);
      html += '<details class="ee-ch-menu' + (isCurrent ? ' is-page-chakra' : '') + '" data-chakra="' + ch.slug + '">';
      html += '<summary class="ee-ch-sum" title="' + ch.name + ' (' + ch.summary + ')">';
      html += '<span class="ee-ch-dot"></span>';
      html += '<span>' + ch.name + '</span>';
      html += '<span class="ee-ch-caret">▾</span>';
      html += '</summary>';

      /* LEVEL 2 SUBMENU: Projects & Studio Apps in this Chakra */
      html += '<div class="ee-l2-dropdown" data-chakra="' + ch.slug + '">';
      html += '<div class="ee-l2-head">';
      html += '<strong>' + ch.name + '</strong>';
      html += '<span>' + ch.hz + ' · ' + ch.gem + '</span>';
      html += '</div>';

      for (var p = 0; p < ch.projects.length; p++) {
        var proj = ch.projects[p];
        html += '<details class="ee-l2-proj" data-project="' + proj.projectSlug + '"' + (proj.isAppHub ? ' open' : '') + '>';
        html += '<summary class="ee-l2-proj-sum">';
        html += '<span class="ee-l2-proj-meta">';
        html += '<span>' + proj.projectName + '</span>';
        html += '<small>' + proj.projectSubtitle + '</small>';
        html += '</span>';
        html += '<span class="ee-l2-arrow">▸</span>';
        html += '</summary>';

        /* LEVEL 3 SUBMENU: Apps or Employee Agent Dashes under this Project */
        html += '<div class="ee-l3-submenu">';
        html += '<div class="ee-l3-head">';
        html += '<strong>' + proj.projectName + '</strong>';
        html += '<span>' + (proj.isAppHub ? proj.employees.length + ' Studio Apps' : proj.employees.length + ' Agent Dashes') + '</span>';
        html += '</div>';

        for (var e = 0; e < proj.employees.length; e++) {
          var emp = proj.employees[e];
          var dashUrl = emp.getDashUrl();
          html += '<a class="ee-l3-item" href="' + dashUrl + '" data-agent-link="1" data-chakra="' + ch.slug + '" data-project="' + proj.projectSlug + '" data-agent="' + emp.role + '">';
          html += '<span class="ee-l3-item-left">';
          html += '<span class="ee-l3-role-tag">' + emp.code + '</span>';
          html += '<span>' + emp.title + '</span>';
          html += '</span>';
          html += '<span class="ee-l3-dash-pill">' + (emp.customHref ? 'Open ↗' : 'Dash →') + '</span>';
          html += '</a>';
        }

        html += '<div class="ee-l3-foot">';
        html += '<a href="' + proj.employees[0].getDashUrl() + '">Open ' + proj.projectName + '</a>';
        if (proj.liveUrl) {
          html += '<a class="is-quiet" href="' + proj.liveUrl + '">Live Surface ↗</a>';
        }
        html += '</div>';
        html += '</div>';
        html += '</details>';
      }

      html += '</div>';
      html += '</details>';
    }

    /* Compact Settings Menu Button (tucks system settings away from the main header bar) */
    var safeNow = isPresentationSafeMode();
    html += '<details class="ee-ch-menu ee-settings-menu" data-settings-menu="1">';
    html += '<summary class="ee-ch-sum" title="Studio Settings">';
    html += '<span>⚙</span>';
    html += '</summary>';
    html += '<div class="ee-l2-dropdown" data-chakra="00-void">';
    html += '<div class="ee-l2-head"><strong>Studio Settings</strong><span>System Controls</span></div>';
    html += '<a class="ee-l3-item" href="#toggle-safe-mode" id="ee-safe-toggle-item"><span class="ee-l3-item-left"><span class="ee-l3-role-tag">SAFE</span><span>Privacy Redactor: ' + (safeNow ? 'ON' : 'OFF') + '</span></span><span class="ee-l3-dash-pill">Toggle</span></a>';
    html += '<a class="ee-l3-item" href="http://127.0.0.1:7871/FUEL-HUB.html#burn-desk"><span class="ee-l3-item-left"><span class="ee-l3-role-tag">7871</span><span>Subscription &amp; Fuel Monitor</span></span><span class="ee-l3-dash-pill">Open ↗</span></a>';
    html += '<a class="ee-l3-item" href="http://localhost:7863/portal"><span class="ee-l3-item-left"><span class="ee-l3-role-tag">7863</span><span>Studio Portal &amp; Ports</span></span><span class="ee-l3-dash-pill">Open ↗</span></a>';
    html += '<a class="ee-l3-item" href="http://127.0.0.1:8655/BUSINESS-GENERATOR-TOOLSET-PICKER__OG.html"><span class="ee-l3-item-left"><span class="ee-l3-role-tag">8655</span><span>Model.Toolset &amp; Queue</span></span><span class="ee-l3-dash-pill">Open ↗</span></a>';
    html += '</div>';
    html += '</details>';

    html += '</nav>';
    html += '</div>';
    html += '</div>';

    h.innerHTML = html;

    var safeToggleItem = document.getElementById("ee-safe-toggle-item");
    if (safeToggleItem) {
      safeToggleItem.addEventListener("click", function (ev) {
        ev.preventDefault();
        var nextSafe = !isPresentationSafeMode();
        try {
          localStorage.setItem("ee_presentation_safe", nextSafe ? "1" : "0");
        } catch (_) {}
        window.location.reload();
      });
    }

    if (keepOpenSelector) {
      var keepEl = h.querySelector(keepOpenSelector);
      if (keepEl) keepEl.setAttribute("open", "open");
    }

    /* Wire Level-1 Chakra menu accordion + live Chakra OS color preview */
    var chMenus = h.querySelectorAll("details.ee-ch-menu");
    for (var m = 0; m < chMenus.length; m++) {
      (function (det) {
        det.addEventListener("toggle", function () {
          if (det.open) {
            closeAllHeaderMenus(det);
            var chSlug = det.getAttribute("data-chakra");
            if (chSlug && CHAKRA_BY_SLUG[chSlug]) {
              CHAKRA_BY_SLUG[chSlug].applyThemeToDocument();
              var badge = h.querySelector(".ee-os-badge");
              if (badge) badge.textContent = CHAKRA_BY_SLUG[chSlug].name.toUpperCase() + " · " + detectShortPageLocation();
              for (var k = 0; k < chMenus.length; k++) {
                if (chMenus[k].hasAttribute("data-chakra")) {
                  chMenus[k].classList.toggle("is-page-chakra", chMenus[k] === det);
                }
              }
            }
          }
        });
      })(chMenus[m]);
    }

    /* Wire Level-2 Project submenu accordion so only one Level-3 flyout is open at a time */
    var projMenus = h.querySelectorAll("details.ee-l2-proj");
    for (var pm = 0; pm < projMenus.length; pm++) {
      (function (pDet) {
        pDet.addEventListener("toggle", function () {
          if (pDet.open) {
            closeSiblingProjects(pDet.parentElement, pDet);
          }
        });
        pDet.addEventListener("mouseenter", function () {
          closeSiblingProjects(pDet.parentElement, pDet);
          pDet.setAttribute("open", "open");
        });
      })(projMenus[pm]);
    }
  }

  /* ==========================================================================
     5. RENDER THE SINGLE-ROW GLOBAL STUDIO FOOTER (#ee-footer)
     ========================================================================== */
  function renderFooter() {
    var f = document.getElementById("ee-footer");
    if (!f) {
      f = document.createElement("footer");
      f.id = "ee-footer";
      f.setAttribute("role", "contentinfo");
      document.body.appendChild(f);
    }
    var activeSlug = detectPageChakraSlug();
    var activeChakra = CHAKRA_BY_SLUG[activeSlug] || CHAKRA_NODES[0];
    var title = detectShortPageLocation();

    var html = '<div class="ee-ftr-wrap">';
    html += '<div class="ee-chrome-bar">';
    html += '<span class="ee-meta"><strong>' + activeChakra.name + '</strong> · ' + title + ' — Rate or refine this web app:</span>';
    html += '<span class="ee-verdict" role="group" aria-label="Page verdict">';
    html += '<button type="button" class="is-main" data-ee-v="YAY">YAY</button>';
    html += '<button type="button" data-ee-v="NAY">NAY</button>';
    html += '<input type="text" id="ee-note" placeholder="Feedback or task for this agent..." aria-label="Feedback note">';
    html += '<button type="button" id="ee-send">Send</button>';
    html += '<span id="ee-sent" class="ee-meta"></span>';
    html += '</span>';
    html += '<nav aria-label="Footer quick links">';
    html += '<a href="http://127.0.0.1:8655/BUSINESS-GENERATOR-TOOLSET-PICKER__OG.html">Model.Toolset</a>';
    html += '<a href="http://127.0.0.1:8655/fun-projects-100x">100x Lab</a>';
    html += '<a href="http://127.0.0.1:7871/FUEL-HUB.html#burn-desk">Fuel :7871</a>';
    html += '<a href="#ee-header">Top ↑</a>';
    html += '</nav>';
    html += '</div>';
    html += '</div>';
    f.innerHTML = html;

    var vBtns = f.querySelectorAll("[data-ee-v]");
    for (var b = 0; b < vBtns.length; b++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          var v = btn.getAttribute("data-ee-v");
          var noteEl = document.getElementById("ee-note");
          sendFooterFeedback(v, noteEl ? noteEl.value : "");
        });
      })(vBtns[b]);
    }
    var sendBtn = document.getElementById("ee-send");
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var noteEl = document.getElementById("ee-note");
        sendFooterFeedback("NOTE", noteEl ? noteEl.value : "");
      });
    }
  }

  function sendFooterFeedback(verdict, note) {
    var s = document.getElementById("ee-sent");
    if (s) s.textContent = "Saving...";
    fetch("http://127.0.0.1:8655/api/self-improve-hook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "save_feedback_and_patch",
        source: "refineme-widget-oop",
        page: window.location.pathname,
        title: document.title,
        verdict: verdict,
        note: note,
        ts: new Date().toISOString()
      })
    })
      .then(function () { if (s) s.textContent = "Saved"; })
      .catch(function () { if (s) s.textContent = "Saved locally"; });
  }

  /* ==========================================================================
     6. OBJECT-ORIENTED WEB-APP SHELL (EvolveWebAppShell)
        Transforms endlessly scrolling multi-section pages & giant card/table walls
        into crisp, aligned 1-View-at-a-Time Web Apps with minimal/zero scrolling.
     ========================================================================== */

  function GridDeckPaginator(gridEl, pageSize) {
    this.gridEl = gridEl;
    this.pageSize = pageSize || 6;
    this.currentPage = 1;
    this.showAll = false;
    this.searchQuery = "";
    this.pagerEl = null;
    this.init();
  }

  GridDeckPaginator.prototype.getCards = function () {
    var children = this.gridEl.children;
    var out = [];
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.classList.contains("ee-grid-pager")) continue;
      if (el.getAttribute("data-ee-ext-filtered") === "1") continue;
      out.push(el);
    }
    return out;
  };

  GridDeckPaginator.prototype.init = function () {
    if (this.gridEl.getAttribute("data-ee-grid-paged") === "1") return;
    var allCards = this.getCards();
    if (allCards.length <= this.pageSize) return;

    this.gridEl.setAttribute("data-ee-grid-paged", "1");
    this.gridEl.classList.add("ee-webapp-grid");

    var bar = document.createElement("div");
    bar.className = "ee-grid-pager";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Web-App Deck Paginator");
    this.gridEl.parentNode.insertBefore(bar, this.gridEl);
    this.pagerEl = bar;

    this.render();
  };

  GridDeckPaginator.prototype.render = function () {
    if (!this.pagerEl) return;
    var self = this;
    var rawCards = this.getCards();
    var q = (this.searchQuery || "").toLowerCase().trim();
    var matched = [];

    for (var i = 0; i < rawCards.length; i++) {
      var c = rawCards[i];
      var txt = (c.textContent || "").toLowerCase();
      var isMatch = !q || txt.indexOf(q) !== -1;
      c.setAttribute("data-ee-search-match", isMatch ? "1" : "0");
      if (isMatch) matched.push(c);
    }

    var total = matched.length;
    var totalPages = Math.max(1, Math.ceil(total / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    var startIdx = this.showAll ? 0 : (this.currentPage - 1) * this.pageSize;
    var endIdx = this.showAll ? total : Math.min(total, startIdx + this.pageSize);

    for (var j = 0; j < rawCards.length; j++) {
      rawCards[j].classList.add("ee-paged-hidden");
    }
    for (var m = 0; m < matched.length; m++) {
      if (this.showAll || (m >= startIdx && m < endIdx)) {
        matched[m].classList.remove("ee-paged-hidden");
      }
    }

    var html = '<div class="ee-gp-left">';
    html += '<span class="ee-gp-count">Showing <strong>' + (total === 0 ? 0 : (startIdx + 1) + '–' + endIdx) + '</strong> of <strong>' + total + '</strong></span>';
    html += '<input type="search" class="ee-gp-search" placeholder="Filter cards in this view..." value="' + this.searchQuery.replace(/"/g, "&quot;") + '" aria-label="Filter cards">';
    html += '</div>';

    html += '<div class="ee-gp-right">';
    if (!this.showAll && totalPages > 1) {
      html += '<button type="button" class="ee-gp-btn" data-gp-act="prev"' + (this.currentPage <= 1 ? ' disabled' : '') + '>← Prev</button>';
      var maxPills = Math.min(totalPages, 7);
      for (var p = 1; p <= maxPills; p++) {
        html += '<button type="button" class="ee-gp-btn' + (p === this.currentPage ? ' is-active' : '') + '" data-gp-page="' + p + '">' + p + '</button>';
      }
      if (totalPages > 7) {
        html += '<span class="ee-gp-dots">… ' + totalPages + '</span>';
      }
      html += '<button type="button" class="ee-gp-btn" data-gp-act="next"' + (this.currentPage >= totalPages ? ' disabled' : '') + '>Next →</button>';
    }
    if (total > this.pageSize) {
      html += '<button type="button" class="ee-gp-btn is-toggle" data-gp-act="toggle-all">' + (this.showAll ? 'Compact 6/Page' : 'Show All (' + total + ')') + '</button>';
    }
    html += '</div>';

    this.pagerEl.innerHTML = html;

    var searchInput = this.pagerEl.querySelector(".ee-gp-search");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        var pos = searchInput.selectionStart;
        self.searchQuery = searchInput.value;
        self.currentPage = 1;
        self.render();
        var nextInput = self.pagerEl.querySelector(".ee-gp-search");
        if (nextInput) {
          nextInput.focus();
          try { nextInput.setSelectionRange(pos, pos); } catch (_) {}
        }
      });
    }

    var btns = this.pagerEl.querySelectorAll("button[data-gp-act], button[data-gp-page]");
    for (var b = 0; b < btns.length; b++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          var act = btn.getAttribute("data-gp-act");
          var pg = btn.getAttribute("data-gp-page");
          if (act === "prev") self.currentPage--;
          else if (act === "next") self.currentPage++;
          else if (act === "toggle-all") self.showAll = !self.showAll;
          else if (pg) self.currentPage = parseInt(pg, 10) || 1;
          self.render();
        });
      })(btns[b]);
    }
  };

  function TableDeckPaginator(tableEl, pageSize) {
    this.tableEl = tableEl;
    this.tbody = tableEl.querySelector("tbody");
    this.isNotebookTable = tableEl.classList.contains("ee-stack-table");
    this.pageSize = pageSize || (this.isNotebookTable ? 1 : 6);
    this.currentPage = 1;
    this.showAll = false;
    this.pagerEl = null;
    if (this.tbody) this.init();
  }

  TableDeckPaginator.prototype.init = function () {
    if (this.tableEl.getAttribute("data-ee-table-paged") === "1") return;
    this.tableEl.setAttribute("data-ee-table-paged", "1");

    var self = this;
    var wrap = this.tableEl.closest(".ee-table-wrap, .table-wrap") || this.tableEl;
    var bar = document.createElement("div");
    bar.className = "ee-grid-pager ee-table-pager";
    wrap.parentNode.insertBefore(bar, wrap);
    this.pagerEl = bar;

    this.render();

    try {
      var obs = new MutationObserver(function () {
        self.render();
      });
      obs.observe(this.tbody, { childList: true });
    } catch (_) {}
  };

  TableDeckPaginator.prototype.render = function () {
    if (!this.pagerEl || !this.tbody) return;
    var self = this;
    var rows = [];
    for (var i = 0; i < this.tbody.children.length; i++) {
      if (this.tbody.children[i].tagName === "TR") rows.push(this.tbody.children[i]);
    }
    var total = rows.length;
    if (total <= this.pageSize) {
      this.pagerEl.classList.add("ee-paged-hidden");
      for (var r0 = 0; r0 < rows.length; r0++) rows[r0].classList.remove("ee-paged-hidden");
      return;
    }
    this.pagerEl.classList.remove("ee-paged-hidden");

    var totalPages = Math.max(1, Math.ceil(total / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    var startIdx = this.showAll ? 0 : (this.currentPage - 1) * this.pageSize;
    var endIdx = this.showAll ? total : Math.min(total, startIdx + this.pageSize);

    for (var r = 0; r < rows.length; r++) {
      if (this.showAll || (r >= startIdx && r < endIdx)) {
        rows[r].classList.remove("ee-paged-hidden");
      } else {
        rows[r].classList.add("ee-paged-hidden");
      }
    }

    var unitLbl = this.isNotebookTable ? "Notebook Page" : "Rows";
    var html = '<div class="ee-gp-left">';
    html += '<span class="ee-gp-count">' + unitLbl + ' <strong>' + (this.showAll ? ('1–' + total) : (this.pageSize === 1 ? this.currentPage : (startIdx + 1) + '–' + endIdx)) + '</strong> of <strong>' + total + '</strong></span>';
    html += '</div>';
    html += '<div class="ee-gp-right">';
    if (!this.showAll && totalPages > 1) {
      html += '<button type="button" class="ee-gp-btn" data-tp-act="prev"' + (this.currentPage <= 1 ? ' disabled' : '') + '>← Prev</button>';
      var maxPills = Math.min(totalPages, 8);
      for (var p = 1; p <= maxPills; p++) {
        html += '<button type="button" class="ee-gp-btn' + (p === this.currentPage ? ' is-active' : '') + '" data-tp-page="' + p + '">' + p + '</button>';
      }
      html += '<button type="button" class="ee-gp-btn" data-tp-act="next"' + (this.currentPage >= totalPages ? ' disabled' : '') + '>Next →</button>';
    }
    html += '<button type="button" class="ee-gp-btn is-toggle" data-tp-act="toggle-all">' + (this.showAll ? '1-by-1 App View' : 'Show All (' + total + ')') + '</button>';
    html += '</div>';

    this.pagerEl.innerHTML = html;

    var btns = this.pagerEl.querySelectorAll("button[data-tp-act], button[data-tp-page]");
    for (var b = 0; b < btns.length; b++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          var act = btn.getAttribute("data-tp-act");
          var pg = btn.getAttribute("data-tp-page");
          if (act === "prev") self.currentPage--;
          else if (act === "next") self.currentPage++;
          else if (act === "toggle-all") self.showAll = !self.showAll;
          else if (pg) self.currentPage = parseInt(pg, 10) || 1;
          self.render();
        });
      })(btns[b]);
    }
  };

  function EvolveWebAppShell() {
    this.mainEl = null;
    this.tabBarEl = null;
    this.sections = [];
    this.activeIdx = 0;
    this.gridPaginators = [];
    this.tablePaginators = [];
  }

  EvolveWebAppShell.prototype.ensureMainWrapper = function () {
    var existingMain = document.querySelector("body > main, body > .sc-page, body > .bp-main, body > .wrap, body > .container");
    if (existingMain) {
      existingMain.classList.add("ee-webapp-main");
      this.mainEl = existingMain;
    } else {
      var m = document.createElement("main");
      m.className = "ee-webapp-main";
      var hdr = document.getElementById("ee-header");
      var ftr = document.getElementById("ee-footer");
      var toMove = [];
      for (var i = 0; i < document.body.children.length; i++) {
        var ch = document.body.children[i];
        if (ch === hdr || ch === ftr || ch.tagName === "SCRIPT" || ch.tagName === "STYLE" || ch.tagName === "LINK") continue;
        toMove.push(ch);
      }
      if (hdr && hdr.nextSibling) {
        document.body.insertBefore(m, hdr.nextSibling);
      } else {
        document.body.insertBefore(m, ftr || null);
      }
      for (var j = 0; j < toMove.length; j++) {
        m.appendChild(toMove[j]);
      }
      this.mainEl = m;
    }

    /* If main has multiple direct <h2> blocks without <section> wrappers (e.g. :8657 Handwriting trainer), wrap each <h2> group into a <section> */
    var directSections = [];
    for (var k = 0; k < this.mainEl.children.length; k++) {
      if (this.mainEl.children[k].tagName === "SECTION") directSections.push(this.mainEl.children[k]);
    }
    if (directSections.length === 0) {
      var directH2s = [];
      for (var h = 0; h < this.mainEl.children.length; h++) {
        if (this.mainEl.children[h].tagName === "H2") directH2s.push(this.mainEl.children[h]);
      }
      if (directH2s.length >= 2) {
        var kids = Array.prototype.slice.call(this.mainEl.children);
        var curSec = null;
        for (var idx = 0; idx < kids.length; idx++) {
          var node = kids[idx];
          if (node.tagName === "SCRIPT" || node.tagName === "STYLE") continue;
          if (node.tagName === "H2") {
            curSec = document.createElement("section");
            curSec.className = "ee-auto-section stack";
            this.mainEl.insertBefore(curSec, node);
            curSec.appendChild(node);
          } else if (curSec) {
            curSec.appendChild(node);
          }
        }
      }
    }
  };

  EvolveWebAppShell.prototype.extractSectionLabel = function (sec, idx) {
    var heading = sec.querySelector("h2, h1, h3, .kicker, .label");
    var raw = "";
    if (heading && heading.textContent) {
      raw = heading.textContent.trim();
    } else if (sec.id) {
      raw = sec.id.replace(/[-_]+/g, " ");
    } else {
      raw = "View " + (idx + 1);
    }
    raw = raw
      .replace(/^[^\w\d]+/, "")
      .replace(/\s*[—–|-]\s*.*$/, "")
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (raw.length > 26) raw = raw.slice(0, 25).trim() + "…";
    return (idx + 1) + " · " + (raw || ("View " + (idx + 1)));
  };

  EvolveWebAppShell.prototype.isPureHeroSection = function (sec) {
    if (!sec) return false;
    var hasH1 = !!sec.querySelector("h1");
    var hasTableOrForm = !!sec.querySelector("table, form, canvas, .bp-grid, .sc-table, .sc-tbl");
    var cardCount = sec.querySelectorAll(".card, .bp-card, article").length;
    return hasH1 && !hasTableOrForm && cardCount <= 4;
  };

  EvolveWebAppShell.prototype.activateSection = function (idx) {
    if (idx < 0 || idx >= this.sections.length) idx = 0;
    this.activeIdx = idx;
    for (var i = 0; i < this.sections.length; i++) {
      var isAct = (i === idx);
      this.sections[i].hidden = !isAct;
      this.sections[i].classList.toggle("ee-webapp-active-view", isAct);
    }
    if (this.tabBarEl) {
      var btns = this.tabBarEl.querySelectorAll(".ee-wa-tab");
      for (var b = 0; b < btns.length; b++) {
        var bAct = (b === idx);
        btns[b].classList.toggle("is-active", bAct);
        btns[b].setAttribute("aria-selected", bAct ? "true" : "false");
      }
    }
  };

  EvolveWebAppShell.prototype.mountSectionTabs = function () {
    if (!this.mainEl) return;
    var self = this;

    /* If the page already uses .sc-tabs (e.g. fun-projects-100x), compact its hero strip and skip duplicate tab bar */
    var existingScTabs = this.mainEl.querySelector(".sc-tabs");
    if (existingScTabs) {
      var topHero = this.mainEl.querySelector(".hero");
      if (topHero) topHero.classList.add("ee-webapp-hero-strip");
      return;
    }

    var candidateContainer = this.mainEl;
    var directSecs = [];
    for (var i = 0; i < candidateContainer.children.length; i++) {
      var el = candidateContainer.children[i];
      if (el.tagName === "SECTION" || el.classList.contains("bp-block") || el.classList.contains("section")) {
        directSecs.push(el);
      }
    }

    if (directSecs.length < 2) return;

    var tabSections = directSecs.slice();
    if (this.isPureHeroSection(directSecs[0]) && directSecs.length >= 2) {
      directSecs[0].classList.add("ee-webapp-hero-strip");
      tabSections = directSecs.slice(1);
    }

    if (tabSections.length < 2) return;

    this.sections = tabSections;
    var bar = document.createElement("nav");
    bar.id = "ee-webapp-bar";
    bar.className = "ee-webapp-bar";
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", "Web-App View Switcher");

    var html = '<span class="ee-wa-kicker">APP VIEWS (' + tabSections.length + '):</span>';
    html += '<div class="ee-wa-tabs">';
    for (var s = 0; s < tabSections.length; s++) {
      var lbl = this.extractSectionLabel(tabSections[s], s);
      html += '<button type="button" class="ee-wa-tab' + (s === 0 ? ' is-active' : '') + '" role="tab" aria-selected="' + (s === 0 ? 'true' : 'false') + '" data-wa-idx="' + s + '">' + lbl + '</button>';
    }
    html += '</div>';
    bar.innerHTML = html;

    tabSections[0].parentNode.insertBefore(bar, tabSections[0]);
    this.tabBarEl = bar;

    var tabBtns = bar.querySelectorAll(".ee-wa-tab");
    for (var tb = 0; tb < tabBtns.length; tb++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          var targetIdx = parseInt(btn.getAttribute("data-wa-idx"), 10) || 0;
          self.activateSection(targetIdx);
        });
      })(tabBtns[tb]);
    }

    this.activateSection(0);

    /* Intercept in-page #anchor links and URL hashes so they switch tabs immediately without scrolling */
    function switchByHash(hashStr) {
      if (!hashStr || hashStr.length < 2 || hashStr === "#ee-header") return false;
      var targetId = hashStr.slice(1);
      var targetEl = document.getElementById(targetId);
      if (!targetEl) return false;
      for (var k = 0; k < self.sections.length; k++) {
        if (self.sections[k] === targetEl || self.sections[k].contains(targetEl)) {
          self.activateSection(k);
          return true;
        }
      }
      return false;
    }

    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var href = a.getAttribute("href");
      if (switchByHash(href)) {
        ev.preventDefault();
        try { history.replaceState(null, "", href); } catch (_) {}
      }
    });

    if (window.location.hash) {
      switchByHash(window.location.hash);
    }
  };

  EvolveWebAppShell.prototype.mountPaginators = function () {
    if (!this.mainEl) return;
    var self = this;

    var grids = this.mainEl.querySelectorAll(".bp-grid, .grid, .oocss-grid, .oocss-grid--2, .cards, .ag-grid, .wf-grid");
    for (var g = 0; g < grids.length; g++) {
      /* Skip compact KPI summary strips */
      if (grids[g].classList.contains("bp-kpis") || grids[g].classList.contains("kpi-grid")) continue;
      this.gridPaginators.push(new GridDeckPaginator(grids[g], 6));
    }

    var tables = this.mainEl.querySelectorAll("table.ee-stack-table, table.sc-table, table.sc-tbl, .table-wrap table, .ee-table-wrap table");
    for (var t = 0; t < tables.length; t++) {
      this.tablePaginators.push(new TableDeckPaginator(tables[t]));
    }

    /* Refresh grid paginators whenever an in-page filter button is clicked */
    this.mainEl.addEventListener("click", function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
      if (!btn || btn.hasAttribute("data-gp-act") || btn.hasAttribute("data-gp-page") || btn.hasAttribute("data-wa-idx")) return;
      setTimeout(function () {
        for (var i = 0; i < self.gridPaginators.length; i++) {
          self.gridPaginators[i].render();
        }
      }, 25);
    });
  };

  EvolveWebAppShell.prototype.boot = function () {
    if (document.body && document.body.classList.contains("bm-app")) return;
    document.documentElement.setAttribute("data-ee-webapp", "1");
    this.ensureMainWrapper();
    this.mountSectionTabs();
    this.mountPaginators();
  };

  window.setEvolveStudioTheme = function (chakraSlug) {
    renderHeader(chakraSlug);
    renderFooter();
  };

  /* ==========================================================================
     7. PRESENTATION PRIVACY REDACTOR (Auto-scrubs private strings on screen)
     ========================================================================== */
  function isPresentationSafeMode() {
    try {
      var v = localStorage.getItem("ee_presentation_safe");
      return v === null ? true : v !== "0";
    } catch (_) {
      return true;
    }
  }

  function scrubPrivateString(s) {
    if (!s || typeof s !== "string") return s;
    return s
      .replace(/\b1762\s+Iris\s+Ave(?:nue)?\b/gi, "[Private Homestead]")
      .replace(/\bIris\s+Ave(?:nue)?\b/gi, "[Private Homestead]")
      .replace(/\bJESUS-911-WIKILEAKS\b/gi, "STUDIO-WORKSTATION")
      .replace(/\bpeacepromoter@gmail\.com\b/gi, "[Private Email]")
      .replace(/\b[A-Za-z0-9._%+-]+@(?:gmail|yahoo|icloud|outlook|hotmail)\.com\b/gi, "[Private Email]")
      .replace(/\b(?:sk-[A-Za-z0-9_-]{14,}|AIza[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|xoxb-[A-Za-z0-9-]{15,})\b/g, "[REDACTED-KEY]")
      .replace(/\b(?:192\.168\.\d{1,3}\.\d{1,3}|100\.113\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/g, "127.0.0.1");
  }

  function applyPresentationPrivacyRedactor(rootNode) {
    if (!isPresentationSafeMode() || !rootNode) return;
    if (document.title) {
      var cleanTitle = scrubPrivateString(document.title);
      if (cleanTitle !== document.title) document.title = cleanTitle;
    }
    var walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var pTag = node.parentNode && node.parentNode.nodeName;
      if (pTag === "SCRIPT" || pTag === "STYLE") continue;
      var orig = node.nodeValue;
      if (orig && /(?:1762|Iris\s+Ave|JESUS-911|@gmail|@yahoo|@icloud|sk-|AIza|ghp_|192\.168\.|100\.113\.|172\.2[67]\.)/i.test(orig)) {
        node.nodeValue = scrubPrivateString(orig);
      }
    }
    if (rootNode.querySelectorAll) {
      var inputs = rootNode.querySelectorAll('input[name*="key" i], input[name*="token" i], input[name*="secret" i], input[id*="key" i], input[id*="token" i], .api-key, .secret-val');
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].tagName === "INPUT" && inputs[i].type === "text") {
          inputs[i].type = "password";
        }
      }
    }
  }

  function boot() {
    renderHeader();
    renderFooter();
    var shell = new EvolveWebAppShell();
    shell.boot();
    window.EE_WEBAPP_SHELL = shell;

    applyPresentationPrivacyRedactor(document.body);
    try {
      var _redactTimer = null;
      var obs = new MutationObserver(function () {
        if (!isPresentationSafeMode()) return;
        if (_redactTimer) clearTimeout(_redactTimer);
        _redactTimer = setTimeout(function () {
          applyPresentationPrivacyRedactor(document.body);
        }, 80);
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (_) {}

    document.addEventListener("click", function (e) {
      var hdr = document.getElementById("ee-header");
      if (hdr && !hdr.contains(e.target)) {
        closeAllHeaderMenus(null);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
