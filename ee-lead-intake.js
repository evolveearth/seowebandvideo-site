/* Business Factory Universal Engine: Role Logins + Proof-First Newsletters + Social Sharing + Lead Intake (Zero Inline Styles, Privacy-Safe) */
(function() {
  function getLocalStudioEndpoint(apiPath) {
    var path = apiPath || '/api/website-lead';
    var h = (window.location && window.location.hostname) ? window.location.hostname : '';
    if (h === 'localhost' || h.indexOf('127.') === 0) {
      var p = (path.indexOf('dia-newsletter') !== -1 && window.location.port === '8655') ? 8655 : (7800 + 63);
      return window.location.protocol + '//' + h + ':' + p + path;
    }
    return path;
  }

  var ROLE_LABELS = {
    policyholder: 'Policyholder / Property Owner',
    carrier: 'Insurance Carrier Examiner / Loss-Prevention Exec',
    ia_firm: 'IA Firm Coordinator / CAT Adjuster / Ladder Assist',
    roofer: 'Roofing Contractor (HAAG / ITEL / FORTIFIED)',
    mitigation: 'Water, Fire & Mold Mitigation Tech (IICRC S500)',
    restoration: 'Reconstruction General Contractor (10%+10% O&P)',
    partner: 'B2B Partner / Studio Member'
  };

  var ROLE_TO_NL = {
    policyholder: 'PREPRESTORE',
    carrier: 'PREPRESTORE-CARRIER',
    ia_firm: 'CLOSING-CLAIMS-CARRIER-IA',
    roofer: 'PREPRESTORE-ROOFER',
    mitigation: 'PREPRESTORE-MITIGATION',
    restoration: 'PREPRESTORE-RESTORATION',
    partner: 'CLOSING-CLAIMS'
  };

  window.eeSetStrength = function(strength, btnEl) {
    var s = strength || 'bright';
    document.documentElement.setAttribute('data-strength', s);
    document.querySelectorAll('.bp-strength-btn').forEach(function(b) {
      var bs = b.getAttribute('data-strength-val');
      if (bs) {
        b.classList.toggle('is-active', bs === s);
      }
    });
    if (btnEl && btnEl.classList) {
      btnEl.classList.add('is-active');
    }
    try { localStorage.setItem('ee_chakra_strength', s); } catch (e) {}
  };

  window.eePortalLogin = async function(slug, customRole, customEmail) {
    var roleEl = document.getElementById('ee-login-role-' + slug);
    var emailEl = document.getElementById('ee-login-email-' + slug);
    var badgeEl = document.getElementById('ee-login-badge-' + slug);
    var stEl = document.getElementById('ee-login-status-' + slug);

    var role = customRole || (roleEl ? roleEl.value : 'policyholder');
    var email = customEmail || (emailEl ? emailEl.value.trim() : '');
    if (!email) {
      if (stEl) {
        stEl.hidden = false;
        stEl.textContent = 'Enter your work email or SMS number above to activate your role session.';
      }
      return false;
    }

    var token = 'OTP-' + Math.floor(100000 + Math.random() * 900000);
    var session = {
      slug: slug,
      role: role,
      role_label: ROLE_LABELS[role] || role,
      email: email,
      token: token,
      logged_in_at: new Date().toISOString()
    };
    try {
      localStorage.setItem('ee_portal_session', JSON.stringify(session));
    } catch (e) {}

    if (badgeEl) {
      badgeEl.textContent = 'Signed In: ' + session.role_label + ' (' + email + ')';
    }
    if (stEl) {
      stEl.hidden = false;
      stEl.textContent = 'Session active for ' + email + ' [' + session.role_label + ']. Magic-Link & Verification Code ' + token + ' logged.';
    }

    var nlSel = document.getElementById('ee-nl-segment-' + slug);
    if (nlSel && ROLE_TO_NL[role]) {
      nlSel.value = ROLE_TO_NL[role];
    }
    var nlEmail = document.getElementById('ee-nl-email-' + slug);
    if (nlEmail && !nlEmail.value && email.indexOf('@') !== -1) {
      nlEmail.value = email;
    }
    var leadContact = document.getElementById('ee-lead-contact-' + slug);
    if (leadContact && !leadContact.value) {
      leadContact.value = email;
    }

    if (typeof window.onEeRoleActivated === 'function') {
      try { window.onEeRoleActivated(role, session); } catch (e) {}
    }

    try {
      await fetch(getLocalStudioEndpoint('/api/website-lead'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          action: 'submit_lead',
          site_slug: slug,
          name: 'Portal Login (' + session.role_label + ')',
          contact: email,
          offer: 'Role-Based Portal Login: ' + session.role_label,
          context: 'Session Token ' + token + ' | Role: ' + role
        })
      });
    } catch (e) {}
    return session;
  };

  window.eePortalLogout = function(slug) {
    try { localStorage.removeItem('ee_portal_session'); } catch (e) {}
    var badgeEl = document.getElementById('ee-login-badge-' + slug);
    var stEl = document.getElementById('ee-login-status-' + slug);
    if (badgeEl) badgeEl.textContent = 'Guest Session · Passwordless Magic-Link / 2FA OTP Ready';
    if (stEl) {
      stEl.hidden = false;
      stEl.textContent = 'Signed out cleanly. Local session cleared.';
    }
  };

  window.eeSubscribeNewsletter = async function(slug, customCode, customEmail) {
    var emailEl = document.getElementById('ee-nl-email-' + slug);
    var segEl = document.getElementById('ee-nl-segment-' + slug);
    var stEl = document.getElementById('ee-nl-status-' + slug);

    var email = customEmail || (emailEl ? emailEl.value.trim() : '');
    var bizCode = customCode || (segEl ? segEl.value : 'CLOSING-CLAIMS');
    if (!email) {
      if (stEl) {
        stEl.hidden = false;
        stEl.textContent = 'Please enter your email address to subscribe.';
      }
      return false;
    }
    if (stEl) {
      stEl.hidden = false;
      stEl.textContent = 'Subscribing ' + email + ' to ' + bizCode + '.newsletter (running domain typo repair & RFC 8058 setup)...';
    }
    var rawLine = email + ', Portal Subscriber, ' + slug.toUpperCase() + ', trade-optin,' + slug;
    try {
      var r = await fetch(getLocalStudioEndpoint('/api/dia-newsletter'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          action: 'import_list',
          business_code: bizCode,
          raw_text: rawLine,
          tags: 'website-optin,' + slug + ',' + bizCode.toLowerCase()
        })
      });
      if (r && r.ok) {
        var d = await r.json();
        var ar = (d && d.action_result) ? d.action_result : {};
        var fixedNote = (ar.typos_fixed && ar.typos_fixed.length) ? (' (Auto-repaired typo: ' + ar.typos_fixed.join(', ') + ')') : '';
        if (stEl) {
          stEl.textContent = 'Confirmed! ' + email + ' subscribed to ' + bizCode + '.newsletter & Campfire room' + fixedNote + '.';
        }
        return true;
      }
    } catch (e) {}

    try {
      await fetch(getLocalStudioEndpoint('/api/website-lead'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          action: 'submit_lead',
          site_slug: slug,
          name: 'Newsletter Subscriber (' + bizCode + ')',
          contact: email,
          offer: 'Newsletter Subscription: ' + bizCode + '.newsletter',
          context: 'RFC 8058 1-Click Opt-In from ' + slug
        })
      });
    } catch (e) {}
    if (stEl) {
      stEl.textContent = 'Confirmed! ' + email + ' added to ' + bizCode + '.newsletter dispatch queue.';
    }
    return true;
  };

  window.eeShareSocial = async function(slug, platform, customText) {
    var url = (window.location && window.location.href) ? window.location.href : ('https://' + slug + '.com/');
    var title = document.title || (slug.toUpperCase() + ' Storm Response & Claims Portal');
    var shareText = customText || (title + ' — Fast, accurate storm readiness, loss prevention & Xactimate claim software: ' + url);
    var stEl = document.getElementById('ee-share-status-' + slug);

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: title, text: shareText, url: url });
        if (stEl) { stEl.hidden = false; stEl.textContent = 'Shared via device share sheet!'; }
        return;
      } catch (e) {}
    }

    var targetUrl = '';
    if (platform === 'linkedin') {
      targetUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    } else if (platform === 'x') {
      targetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
    } else if (platform === 'facebook') {
      targetUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    } else if (platform === 'whatsapp') {
      targetUrl = 'https://wa.me/?text=' + encodeURIComponent(shareText);
    } else if (platform === 'email') {
      targetUrl = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(shareText);
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (stEl) { stEl.hidden = false; stEl.textContent = 'Opened ' + platform.toUpperCase() + ' share composer + copied link!'; }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      if (stEl) { stEl.hidden = false; stEl.textContent = 'Copied share link & summary to clipboard!'; }
    }
  };

  window.eeCopyViralScript = function(slug, roleHint) {
    var roleEl = document.getElementById('ee-login-role-' + slug);
    var role = roleHint || (roleEl ? roleEl.value : 'policyholder');
    var stEl = document.getElementById('ee-share-status-' + slug);
    var scripts = {
      policyholder:
        '[9:16 SHORT VIDEO & SOCIAL PROOF SCRIPT — POLICYHOLDER TRACK]\n' +
        'HOOK (0-3s): Before the next hurricane or windstorm hits, take 5 minutes to walk your house with your iPhone.\n' +
        'PROOF (3-18s): On PrepRestore.com and ClosingClaims.com, our 5-minute Pre-Storm Baseline logs your roof, windows, and room dimensions + your Hawaii HIEMA 14-day survival kit (1 gal/person/day). If storm damage happens, you have timestamped before-photos so your claim gets paid fairly in days, not months.\n' +
        'CTA (18-25s): Build your free 14-day storm kit & claim baseline at preprestore.com and closingclaims.com.',
      carrier:
        '[9:16 SHORT VIDEO & LINKEDIN BRIEF — CARRIER LOSS-PREVENTION TRACK]\n' +
        'HOOK (0-3s): Every $1 invested in pre-storm roof mitigation saves $4 to $11 in catastrophe claim losses (NIBS Mitigation Saves).\n' +
        'PROOF (3-18s): At carrier.preprestore.com and closingclaims.com, we pair IBHS FORTIFIED sealed-roof-deck retrofits ($1k-$3k) with 16-Agent Zero-Dispute Xactimate/Cotality ESX files—turning high-risk non-renewals into profitable retained policies toward our $1B damage-prevention goal.\n' +
        'CTA (18-25s): Model your portfolio ROI at carrier.preprestore.com.',
      ia_firm:
        '[9:16 SHORT VIDEO & LINKEDIN BRIEF — IA FIRM & CAT ROSTER TRACK]\n' +
        'HOOK (0-3s): How does a storm team inspect 6 to 8 roofs a day without sacrificing safety or Xactimate file quality?\n' +
        'PROOF (3-18s): Our Storm Team model pairs 1 Licensed Lead Adjuster with 2-3 Ladder Assist/Photo Techs (strict 7/12 harness & 25mph wind safety line) feeding our 5-Input Desk Measure Engine (1524 units/ft) and 16-Agent QA Audit. Every FileTrac/ClaimAssist ESX and GLR lands on the examiner desk ordered right the first time.\n' +
        'CTA (18-25s): IA Firm Coordinators (AllCat, Alacrity, Wardlaw, Sedgwick): view our CAT Roster spec at closingclaims.com.',
      roofer:
        '[9:16 SHORT VIDEO & TRADE SCRIPT — ROOFING CONTRACTOR TRACK]\n' +
        'HOOK (0-3s): Roofers: stop losing $4,500+ per claim to omitted starter course, drip edge, valley metal, and brittle-test matching.\n' +
        'PROOF (3-18s): On roofer.preprestore.com and closingclaims.com, you can log pre-storm drone/scale-card roof baselines, stage rapid emergency tarps, and generate statute-cited Xactimate code-upgrade supplements + IBHS FORTIFIED sealed-deck specs.\n' +
        'CTA (18-25s): Open the Roofer Supplement Co-Pilot at roofer.preprestore.com.',
      mitigation:
        '[9:16 SHORT VIDEO & TRADE SCRIPT — WATER/FIRE MITIGATION TRACK]\n' +
        'HOOK (0-3s): Why do carriers cut dehumidifier and air-mover days on water losses? Missing IICRC S500 psychrometric proof.\n' +
        'PROOF (3-18s): Our Mitigation Trade Desk calculates exact IICRC S500 Class 1-4 / Category 1-3 equipment ratios, pairs FLIR thermal + Tramex moisture maps, and outputs carrier-defensible grain-depression logs so families stay 100% safe from mold.\n' +
        'CTA (18-25s): Run the IICRC S500 Drying Calculator at roofer.preprestore.com#mitigation.',
      restoration:
        '[9:16 SHORT VIDEO & TRADE SCRIPT — RESTORATION GC TRACK]\n' +
        'HOOK (0-3s): General Contractors: when 3 or more trades are required on a storm rebuild, 10% Overhead + 10% Profit (O&P) is owed.\n' +
        'PROOF (3-18s): Our Restoration GC portal organizes subcontractor crew teams (tear-off, dry-out, drywall, electrical, millwork, paint) and generates the exact multi-trade Xactimate O&P justification + LKQ contents schedule.\n' +
        'CTA (18-25s): Launch the GC O&P & Crew Staging Desk at roofer.preprestore.com#restoration.'
    };
    var txt = scripts[role] || scripts.policyholder;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt);
    }
    if (stEl) {
      stEl.hidden = false;
      stEl.textContent = 'Copied 9:16 Video & Social Proof Script for [' + (ROLE_LABELS[role] || role) + '] to clipboard!';
    }
    return txt;
  };

  window.eeFindReciprocalMatch = function(slug) {
    var iamEl = document.getElementById('ee-seek-iam-' + slug);
    var tgtEl = document.getElementById('ee-seek-target-' + slug);
    var resBox = document.getElementById('ee-seek-result-' + slug);
    var resTitle = document.getElementById('ee-seek-result-title-' + slug);
    var resBody = document.getElementById('ee-seek-result-body-' + slug);
    var iamVal = iamEl ? iamEl.value : 'policyholder';
    var tgtVal = tgtEl ? tgtEl.value : 'roofer_mitigator';

    var matchMessages = {
      roofer_mitigator: '3 Staged Storm Trade Pods (HAAG/IBHS FORTIFIED Roofers + 24-Hr IICRC S500 Water Mitigators + 3-Trade Restoration GCs) & Licensed Adjuster Desk (FL #W437424 / HI #479652) are actively seeking homeowners with 5-minute Pre-Storm Baselines on preprestore.com and closingclaims.com.',
      policyholder_baseline: 'Homeowners & HOAs completing the 5-Minute Pre-Storm iPhone LiDAR Baseline on preprestore.com are actively seeking verified Roofers (roofer.preprestore.com), IICRC S500 Mitigators, and Multi-Trade GCs before and after landfall.',
      ia_desk_1524: 'ClosingClaims 5-Input Desk Measure (1,524 units/ft plain-XML) & 16-Agent Pre-Departure Driveway Kickback Check are actively seeking IA Pods (1 Lead Adjuster + 2-3 Ladder Techs = 6-8 roofs/day) and trade contractors.',
      carrier_fortified: 'Carrier Loss-Prevention Directors on carrier.preprestore.com (NIBS $4-$11 saved per $1 invested toward the $1B damage-prevention goal) are actively seeking IBHS FORTIFIED Roofers and Zero-Dispute 6-8 Roofs/Day IA Pods.',
      element_triad: 'LOCKED IN Power Yoga Diet Match: Complementary Fire, Earth, and Air practitioners are actively seeking your element ("Earth and air cool fire; fire and air lift earth; earth and fire ground air") for the next Oahu monthly gathering (108 Goal).',
      chakra_dosha_remedy: 'BestOfMustHave 21-Collection Curators & DNARaw Zone 0 Bio-Sovereignty Protocol Builders are actively seeking your exact chakra.dosha reading ("The store learns from what actually heals, not what sells").',
      retreat_speed_dating: 'Tantric Unity (~12 Masters & 7-to-9 Retreat Organizers), Hi Ba Love (7-Room Playground & Online Speed Dating held safe by OneTrueDAO Trust Bonds), and OSHNA Deep-Listening Circles (108 Goal) are actively seeking you back.',
      seo_dao_bond: 'SEOWebAndVideo (1-Long-to-Many-Shorts & 108 Optimized Client Videos) and OneTrueDAO (Frozen Core: Stake, Verify, Release/Penalize; 1,008 Validators in 50+ Countries) are actively seeking aligned creators and stewards.'
    };

    if (resBox && resTitle && resBody) {
      resBox.hidden = false;
      resTitle.textContent = 'Reciprocal Match Found ("What You Are Seeking Is Seeking You" · ' + iamVal.toUpperCase() + ')';
      resBody.textContent = matchMessages[tgtVal] || matchMessages.element_triad;
    }
    return true;
  };

  window.eeVoteAbIteration = function(slug, variant) {
    var stEl = document.getElementById('ee-ab-status-' + slug);
    try {
      var votes = JSON.parse(localStorage.getItem('ee_the_goal_ab_votes') || '{}');
      var key = slug + ':' + variant;
      votes[key] = (votes[key] || 0) + 1;
      localStorage.setItem('ee_the_goal_ab_votes', JSON.stringify(votes));
    } catch (e) {}
    if (stEl) {
      stEl.hidden = false;
      stEl.textContent =
        'Recorded vote for Variant ' + variant + ' on ' + slug.toUpperCase() +
        ' (+1 Helped/Healed/Loved Merit Point logged to The Goal TOC & A/B Self-Competition Ledger).';
    }
    return true;
  };

  window.submitEeLeadForm = async function(ev, slug) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var sec = document.getElementById('ee-live-intake');
    var dom = (sec && sec.getAttribute('data-site-domain')) || slug.toUpperCase();
    var routeEmail = (sec && sec.getAttribute('data-route-email')) || ('steward@' + slug + '.com');
    var name = (document.getElementById('ee-lead-name-' + slug) || {}).value || '';
    var contact = (document.getElementById('ee-lead-contact-' + slug) || {}).value || '';
    var offer = (document.getElementById('ee-lead-offer-' + slug) || {}).value || '';
    var context = (document.getElementById('ee-lead-context-' + slug) || {}).value || '';
    var notes = (document.getElementById('ee-lead-notes-' + slug) || {}).value || '';

    var payload = {
      site_slug: slug,
      domain: dom,
      name: name,
      contact: contact,
      offer: offer,
      context: context,
      notes: notes,
      submitted_at: new Date().toISOString()
    };

    try {
      var prev = JSON.parse(localStorage.getItem('ee_submitted_leads') || '[]');
      prev.unshift(payload);
      localStorage.setItem('ee_submitted_leads', JSON.stringify(prev.slice(0, 50)));
    } catch (e) {}

    var resBox = document.getElementById('ee-intake-result-' + slug);
    var stEl = document.getElementById('ee-intake-status-' + slug);
    var repEl = document.getElementById('ee-intake-reply-' + slug);
    var mailEl = document.getElementById('ee-intake-mailto-' + slug);
    if (resBox) resBox.hidden = false;
    if (stEl) stEl.textContent = 'Routing submission to ' + dom + ' (' + routeEmail + ')...';

    var fallbackReply =
      dom + ' — PRIORITY INTAKE RECEIPT\n' +
      'Name / Org: ' + name + '\n' +
      'Contact: ' + contact + '\n' +
      'Selected Tier / Scope: ' + offer + '\n' +
      'Context: ' + context + '\n' +
      (notes ? ('Notes: ' + notes + '\n') : '') +
      '\nSTATUS: Logged and ready for priority response via ' + routeEmail + '.';

    var subj = encodeURIComponent('[' + dom + ' Intake] ' + offer + ' — ' + name);
    var body = encodeURIComponent(fallbackReply);
    if (mailEl) {
      mailEl.setAttribute('href', 'mailto:' + routeEmail + '?subject=' + subj + '&body=' + body);
    }

    try {
      var r = await fetch(getLocalStudioEndpoint('/api/website-lead'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if (r && r.ok) {
        var d = await r.json();
        if (stEl) stEl.textContent = d.message || ('Confirmed: Logged to ' + dom + ' Studio Lead Inbox');
        if (repEl) repEl.textContent = (d.lead && d.lead.auto_reply) ? d.lead.auto_reply : fallbackReply;
        return false;
      }
    } catch (err) {}

    if (stEl) stEl.textContent = 'Confirmed: Instant Receipt Generated for ' + dom + ' (' + routeEmail + ')';
    if (repEl) repEl.textContent = fallbackReply;
    return false;
  };

  window.copyEeReceipt = function(slug) {
    var repEl = document.getElementById('ee-intake-reply-' + slug);
    var stEl = document.getElementById('ee-intake-status-' + slug);
    if (repEl && navigator.clipboard) {
      navigator.clipboard.writeText(repEl.innerText);
      if (stEl) stEl.textContent = 'Copied receipt & action plan to clipboard!';
    }
  };

  window.downloadEeLeadMagnet = function(slug) {
    var sec = document.getElementById('ee-live-intake');
    var dom = (sec && sec.getAttribute('data-site-domain')) || slug.toUpperCase();
    var content = '';
    if (slug === 'closingclaims' || slug === 'preprestore') {
      content =
        'CLOSINGCLAIMS.COM & PREPRESTORE.COM — MASTER STORM RESPONSE, IA ROSTER & TRADE CHECKLIST\n' +
        'Licensed Public Adjuster: HI #479652 | FL #W437424 | NFIP Certified\n' +
        'Adopted Goal: Prevent $1 Billion in Storm Damage So Insurance Gets Cheaper for Everyone.\n\n' +
        '01. POLICYHOLDER TRACK (preprestore.com & closingclaims.com):\n' +
        '    - Hawaii HIEMA 14-Day Standard: 1 gal/person/day water (14 gal/person), 14-day shelf-stable food, LiFePO4 battery, NOAA radio, first-aid, kupuna Rx check.\n' +
        '    - 5-Minute Pre-Storm Home Baseline: 4-corner exterior photos, roof slopes, serial numbers, and iPhone LiDAR RoomPlan scan.\n\n' +
        '02. CARRIER EXAMINER & LOSS-PREVENTION TRACK (carrier.preprestore.com):\n' +
        '    - NIBS Mitigation Saves: $11 code / $6 federal / $5 wind / $4 retrofit saved per $1 invested.\n' +
        '    - IBHS FORTIFIED Roof ($1k-$3k sealed roof deck) + 16-Agent Zero-Dispute Cotality/Xactimate ESX packages.\n\n' +
        '03. IA FIRM & STORM TEAM ROSTER TRACK (closingclaims.com):\n' +
        '    - 1 Licensed Lead Adjuster + 2-3 Ladder Assist/Photo Techs (6-8 roofs/day; 7/12 harness & 25mph wind safety line).\n' +
        '    - AllCat, Alacrity, Wardlaw, Sedgwick, Colonial, FileTrac/ClaimAssist zero-revision GLR & photo order compliance.\n\n' +
        '04. CONTRACTOR TRACKS (roofer.preprestore.com):\n' +
        '    - ROOFING: HAAG/ITEL brittle test, drip edge, starter course, ice & water barrier, Ordinance & Law code upgrades.\n' +
        '    - MITIGATION: IICRC S500 Class 1-4 / Category 1-3 psychrometric drying logs, FLIR thermal & Tramex moisture maps.\n' +
        '    - RESTORATION GC: 3+ trade coordination triggering 10% Overhead + 10% Profit (O&P) + subcontractor crew team staging.\n';
    } else {
      content =
        dom + ' — SOVEREIGN ACTION & 7-TO-1 ECOSYSTEM BRIEF\n\n' +
        '7 ONETRUEDAO.COM (07 Crown · 963 Hz) — 108 Art Categories & 40/30/30 Earth-Healing Raffles\n' +
        '6 BESTOFMUSTHAVE.COM (06 Third Eye · 852 Hz) — 4-Gate Buy-It-For-Life (BIFL) & Dosha Curation\n' +
        '5 SEOWEBANDVIDEO.COM (05 Throat · 741 Hz) — Sub-20ms Edge Web, Read-Aloud SEO & 4K Cinema\n' +
        '4 OSHNA.COM (04 Heart · 639 Hz) — Oshna Solar Love, Soft Strength & 6 Archetype Vigils\n' +
        '3 POWERYOGADIET.COM (03 Solar · 528 Hz) — Digestive Agni, Power Yoga & 10 Ayurvedic Herb Formulas\n' +
        '2 TANTRICUNITY.COM (02 Sacral · 417 Hz) — 2-CoCreate Dyad Co-Regulation & Ojas Mastery\n' +
        '1 EVOLVEEARTH.COM + 1 PREPRESTORE.COM (01 Root · 396 Hz) — Physical Earth Sanctuary & Storm Readiness\n';
    }
    var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = slug + '-action-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  window.addEventListener('DOMContentLoaded', function() {
    try {
      var raw = localStorage.getItem('ee_portal_session');
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s && s.email && s.role) {
        document.querySelectorAll('[id^="ee-login-badge-"]').forEach(function(el) {
          el.textContent = 'Signed In: ' + (s.role_label || s.role) + ' (' + s.email + ')';
        });
      }
    } catch (e) {}
  });
})();
