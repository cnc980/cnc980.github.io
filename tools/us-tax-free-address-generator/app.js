const states = [
  {
    code: "DE",
    name: "Delaware",
    places: [
      { city: "Wilmington", zip: "19801" },
      { city: "Wilmington", zip: "19802" },
      { city: "Wilmington", zip: "19805" },
      { city: "Wilmington", zip: "19806" },
      { city: "Wilmington", zip: "19808" },
      { city: "Wilmington", zip: "19810" },
      { city: "Dover", zip: "19901" },
      { city: "Dover", zip: "19904" },
      { city: "Newark", zip: "19711" },
      { city: "Newark", zip: "19713" },
      { city: "Middletown", zip: "19709" },
      { city: "Lewes", zip: "19958" },
      { city: "Rehoboth Beach", zip: "19971" },
      { city: "Milford", zip: "19963" },
      { city: "Smyrna", zip: "19977" }
    ]
  },
  {
    code: "OR",
    name: "Oregon",
    places: [
      { city: "Portland", zip: "97201" },
      { city: "Portland", zip: "97205" },
      { city: "Portland", zip: "97209" },
      { city: "Portland", zip: "97214" },
      { city: "Salem", zip: "97301" },
      { city: "Salem", zip: "97302" },
      { city: "Eugene", zip: "97401" },
      { city: "Eugene", zip: "97405" },
      { city: "Bend", zip: "97701" },
      { city: "Bend", zip: "97702" },
      { city: "Beaverton", zip: "97005" },
      { city: "Hillsboro", zip: "97123" },
      { city: "Medford", zip: "97501" },
      { city: "Ashland", zip: "97520" },
      { city: "Corvallis", zip: "97330" }
    ]
  },
  {
    code: "MT",
    name: "Montana",
    places: [
      { city: "Billings", zip: "59101" },
      { city: "Billings", zip: "59102" },
      { city: "Missoula", zip: "59801" },
      { city: "Missoula", zip: "59802" },
      { city: "Bozeman", zip: "59715" },
      { city: "Bozeman", zip: "59718" },
      { city: "Helena", zip: "59601" },
      { city: "Helena", zip: "59602" },
      { city: "Great Falls", zip: "59401" },
      { city: "Butte", zip: "59701" },
      { city: "Kalispell", zip: "59901" },
      { city: "Whitefish", zip: "59937" },
      { city: "Livingston", zip: "59047" }
    ]
  },
  {
    code: "NH",
    name: "New Hampshire",
    places: [
      { city: "Manchester", zip: "03101" },
      { city: "Manchester", zip: "03102" },
      { city: "Manchester", zip: "03103" },
      { city: "Nashua", zip: "03060" },
      { city: "Nashua", zip: "03062" },
      { city: "Concord", zip: "03301" },
      { city: "Portsmouth", zip: "03801" },
      { city: "Dover", zip: "03820" },
      { city: "Keene", zip: "03431" },
      { city: "Hanover", zip: "03755" },
      { city: "Lebanon", zip: "03766" },
      { city: "Salem", zip: "03079" },
      { city: "Derry", zip: "03038" }
    ]
  },
  {
    code: "AK",
    name: "Alaska",
    places: [
      { city: "Anchorage", zip: "99501" },
      { city: "Anchorage", zip: "99503" },
      { city: "Anchorage", zip: "99508" },
      { city: "Anchorage", zip: "99515" },
      { city: "Juneau", zip: "99801" },
      { city: "Fairbanks", zip: "99701" },
      { city: "Fairbanks", zip: "99709" },
      { city: "Sitka", zip: "99835" },
      { city: "Ketchikan", zip: "99901" },
      { city: "Kodiak", zip: "99615" },
      { city: "Wasilla", zip: "99654" },
      { city: "Palmer", zip: "99645" },
      { city: "Soldotna", zip: "99669" },
      { city: "Bethel", zip: "99559" }
    ]
  }
];

const testNames = [
  "Alex Parker",
  "Taylor Morgan",
  "Jordan Hayes",
  "Casey Brooks",
  "Morgan Reed",
  "Riley Carter",
  "Avery Collins",
  "Quinn Bailey",
  "Cameron Price",
  "Jamie Foster",
  "Drew Bennett",
  "Reese Campbell",
  "Skyler Hughes",
  "Parker Simmons",
  "Rowan Kelly",
  "Emerson Gray",
  "Hayden Russell",
  "Finley Ward",
  "Sage Mitchell",
  "Blake Turner",
  "Logan Sanders",
  "Kendall Cooper",
  "Harper Nelson",
  "Elliot Rivera",
  "Marley Bryant",
  "Robin Bennett",
  "Shawn Edwards",
  "Devon Fisher",
  "Lane Morgan",
  "Terry Wallace"
];

const testStreetRoots = [
  "Harbor View",
  "Cedar Ridge",
  "River Bend",
  "Market Crossing",
  "Summit Crest",
  "Alder Brook",
  "Pine Hollow",
  "Grove Park",
  "Ridge Point",
  "Station Hill",
  "Spruce Valley",
  "Willow Bend",
  "Bay Harbor",
  "Mill Creek",
  "Oak Meadow",
  "Maple Grove",
  "Lake Terrace",
  "Hillcrest",
  "Center Grove",
  "Orchard Park",
  "Birchwood",
  "Bridgewater",
  "Plaza Green",
  "Point Harbor",
  "Commons Way",
  "Oak Mill",
  "Maple Run",
  "Trailside",
  "Town Square",
  "Landing View"
];

const testStreetSuffixes = [
  "Street",
  "Avenue",
  "Road",
  "Lane",
  "Drive",
  "Court",
  "Way",
  "Place",
  "Terrace",
  "Loop"
];

const areaCodes = {
  AK: "907",
  DE: "302",
  MT: "406",
  NH: "603",
  OR: "503"
};

const translations = {
  "zh-Hans": {
    docTitle: "美国免税州地址生成器",
    docDescription: "美国免销售税州地址生成助手：支持测试数据一键生成，也支持真实 PMB/虚拟邮箱地址格式化。",
    brand: "美国免税州地址生成器",
    brandAria: "美国免税州地址生成器首页",
    navAria: "页面导航",
    navGenerator: "生成器",
    navSaved: "已保存",
    navSources: "地址来源",
    navStates: "免税州",
    navApple: "Apple 提示",
    navReferences: "来源",
    updated: "最新核对：2026-07-29",
    heroTitle: "美国免销售税州地址生成助手",
    heroLead: "一键选择 Delaware、Oregon、Montana、New Hampshire 或 Alaska，使用真实常见城市/ZIP 组合生成测试地址，或整理你合法获得的 PMB / 虚拟邮箱地址。",
    startGenerating: "开始生成",
    downloadSpellVPN: "下载 SpellVPN",
    stateBoardAria: "免销售税州概览",
    localTaxCheck: "地方税需核对",
    boundaryTitle: "使用边界",
    boundaryText: "测试数据模式会生成完整地址：城市/ZIP 使用真实常见组合，街道和门牌使用自然风格合成测试数据。测试结果不应拿去填写 Apple Account、付款账单、税务、收货、退货或转运。真实地址模式只用于整理你自己真实可用或获得授权使用的地址。",
    realSourcesTitle: "真实地址来源",
    realSourcesLead: "如果你没有美国真实地址，可以从下面这些正规入口办理。办理后使用服务分配给你的姓名 + PMB/# + 街道地址；不要直接复制服务商官网、门店、仓库或别人的地址。",
    cmraTitle: "CMRA / 私人邮箱",
    cmraText: "USPS 说明 Commercial Mail Receiving Agency 可以代收客户邮件，申请 PMB 通常需要 PS Form 1583 和身份证明。",
    cmraLink: "查看 USPS CMRA 说明",
    upsTitle: "The UPS Store 邮箱",
    upsText: "UPS 官方说明邮箱服务可提供 real street address，并使用 PMB 或 # 标识个人邮箱号。",
    upsLink: "打开 UPS 邮箱服务",
    ipostalTitle: "iPostal1 虚拟邮箱",
    ipostalText: "可选择虚拟邮箱/虚拟地址服务，办理后按平台分配的地址和个人邮箱号填写。",
    ipostalLink: "打开 iPostal1",
    anytimeTitle: "Anytime Mailbox",
    anytimeText: "提供多州虚拟邮箱位置搜索，可优先筛选 Delaware、Oregon、Montana、New Hampshire、Alaska。",
    locationListLink: "查看位置列表",
    postscanTitle: "PostScan Mail",
    postscanText: "提供虚拟邮箱和地址位置列表，选择前确认该州、费用、身份验证和收件规则。",
    uspsZipTitle: "USPS 地址校验",
    uspsZipText: "拿到地址后，用 USPS ZIP Code Lookup 检查城市、州、ZIP 和标准化格式。",
    uspsZipLink: "打开 USPS ZIP Lookup",
    pmbTitle: "PMB 格式提示",
    pmbText: "USPS Publication 28 说明，CMRA 私人邮箱地址应包含 PMB 或 # 加个人邮箱号。不要把 CMRA 自己的 Suite 和你的 PMB 编号混在同一项里。",
    pmbLink: "查看 USPS PMB 地址格式",
    generatorTitle: "生成可复制地址",
    generatorLead: "测试数据模式可直接生成完整地址；真实地址模式用于整理你合法获得的 PMB、虚拟邮箱、公司、学校或授权收件地址。",
    testModeTitle: "一键生成测试地址",
    testModeText: "会自动生成姓名、电话、街道、城市、州和 ZIP。城市/ZIP 来自真实常见组合；街道是自然风格合成测试数据。结果仅用于开发、表单测试、排版预览或教程演示。",
    generateTest: "生成测试地址",
    randomTaxFree: "随机免税州",
    realModeTitle: "真实地址格式化",
    stateLabel: "免销售税州",
    cityZipLabel: "城市 / ZIP",
    nameField: "姓名",
    namePlaceholder: "填写你的真实姓名",
    streetField: "真实街道地址",
    streetPlaceholder: "门牌号、街道名、公司或授权收件地址",
    line2Field: "公寓 / Suite，可留空",
    line2Placeholder: "Apt, Unit, Suite",
    phoneField: "联系电话",
    phonePlaceholder: "你真实可联系的号码",
    generateAddress: "生成地址",
    clear: "清空",
    resultTitle: "地址结果",
    copyFull: "复制完整格式",
    copyFullAria: "复制完整格式",
    copyLine: "复制一行地址",
    copyLineAria: "复制一行地址",
    save: "保存",
    saveAria: "保存生成结果",
    initialResult: "点击“生成测试地址”，或在真实地址模式填写后点击“生成地址”。",
    localOnly: "所有内容只在你的浏览器本机生成，不上传、不保存。",
    savedTitle: "已保存地址",
    savedLead: "保存内容只存在当前浏览器本地。测试数据会继续标记为 TEST DATA。",
    exportJson: "导出 JSON",
    clearSaved: "清空保存",
    tableType: "类型",
    tableName: "姓名",
    tablePhone: "电话",
    tableAddress: "地址",
    tableActions: "操作",
    statesTitle: "可选免销售税州",
    statesLead: "以下州没有州级销售税。Alaska 没有州级销售税，但部分地方可能有地方销售税。",
    appleTitle: "注册美国区时的实操提示",
    noneTitle: "None / 无",
    noneText: "Apple 官方说明，没有购买项目时可能出现 None / 无。实操中，先连接稳定美国 IP，再创建或首次登录美国区 App Store，看到 None 的概率更高，但不是绝对保证。",
    usIpTitle: "美国 IP",
    usIpText: "如果页面一直要求付款方式，可以换美国 IP、换创建入口、退出媒体与购买项目后重试。仍不显示时，以 Apple 当前页面要求为准。",
    spellText: "需要连接美国 IP 时，可下载 SpellVPN。免费版 SpellVPN Ultra 可在 App Store 打开；iOS 付费版和 Mac 付费版使用同一个付费 App Store 条目。",
    ultraFree: "Ultra 免费版",
    iosPaid: "iOS 付费版",
    macPaid: "Mac 付费版",
    referencesTitle: "资料来源",
    appleCreateSource: "Apple 官方：如何创建新的 Apple 账户",
    appleRegionSource: "Apple 官方：更改 Apple 账户国家或地区",
    applePaymentSource: "Apple 官方：Apple Account 可用付款方式",
    taxSource: "Tax Foundation：2026 State Sales Tax Rates Midyear Update",
    cmraSource: "USPS 官方：Commercial Mail Receiving Agency / PMB 说明",
    pmbSource: "USPS Publication 28：Private Mailbox Address 格式",
    footerPrivacy: "本地生成，不上传，不保存。",
    stateNotes: {
      DE: "通常作为免销售税州优先选择之一。",
      OR: "没有州级销售税，线上账单常见选择。",
      MT: "没有州级销售税；个别行业税费另按当地规则。",
      NH: "没有州级销售税；适合只需州/城市/ZIP 的账单格式。",
      AK: "没有州级销售税，但部分城市或地区可能有地方销售税。"
    },
    taxNotes: {
      DE: "没有州级销售税。",
      OR: "没有州级销售税。",
      MT: "没有州级销售税。",
      NH: "没有州级销售税。",
      AK: "没有州级销售税，但可能有地方销售税。"
    },
    chooseState: "选择",
    dataStats: ({ stateCount, placeCount, nameCount, streetCount, combinationCount }) => `当前测试池：${stateCount} 个免销售税州、${placeCount} 组真实常见城市/ZIP、${nameCount} 个测试姓名、${streetCount} 个自然风格合成测试街道组合，随机组合量约 ${combinationCount} 条。`,
    selectedPlace: ({ stateName, city }) => `已选择 ${stateName} / ${city}。请继续填写真实街道地址后生成。`,
    resultHeaderTest: "TEST DATA - 不用于账单、APPLE ACCOUNT、税务、收货、退货或转运",
    resultHeaderReal: "真实 / 授权地址格式",
    resultName: "姓名",
    resultPhone: "电话",
    resultStreet: "街道地址",
    resultLine2: "地址第二行",
    resultCity: "城市",
    resultState: "州",
    resultZip: "ZIP Code",
    resultCountry: "国家/地区",
    unitedStates: "United States",
    resultSalesTaxState: "免销售税州",
    resultTaxNote: "税费提示",
    resultFinalTest: "This is generated test data for development, form testing, layout previews, and tutorials only.",
    resultFinalReal: "仅在该地址真实且你有权使用时使用。",
    testGeneratedNote: "已生成测试数据。不要用于 Apple Account、付款账单、税务、收货、退货或转运。",
    realGeneratedNote: "真实地址格式已生成。请确认你有权使用该地址。",
    cannotGenerate: "还不能生成可提交地址。",
    fillMissing: "请先补齐：",
    noFakeFill: "为了避免虚假账单地址，本工具不会自动补齐街道、门牌、电话或他人地址。",
    realRequiredNote: "免税州、城市和 ZIP 可以自动选择；真实街道和联系方式必须由你提供。",
    copyFirst: "请先生成地址，再复制。",
    copied: "已复制完整格式到剪贴板。",
    copiedLine: "已复制一行地址到剪贴板。",
    copyFailed: "复制失败，可以手动选中结果文本复制。",
    savedEmpty: "暂无保存的地址",
    savedModeTest: "测试数据",
    savedModeReal: "真实地址",
    load: "载入",
    delete: "删除",
    saveFirst: "请先生成地址，再保存。",
    savedNote: "已保存到当前浏览器本地。",
    loadedTest: "已载入测试数据。",
    loadedReal: "已载入真实地址格式。"
  },
  en: {
    docTitle: "US Tax-Free State Address Generator",
    docDescription: "A US sales-tax-free state address helper with one-click test data generation and real PMB / virtual mailbox address formatting.",
    brand: "US Tax-Free Address Generator",
    brandAria: "US Tax-Free Address Generator home",
    navAria: "Page navigation",
    navGenerator: "Generator",
    navSaved: "Saved",
    navSources: "Address Sources",
    navStates: "Tax-Free States",
    navApple: "Apple Tips",
    navReferences: "References",
    updated: "Last checked: 2026-07-29",
    heroTitle: "US Sales-Tax-Free State Address Helper",
    heroLead: "Choose Delaware, Oregon, Montana, New Hampshire, or Alaska to generate test addresses with common real city/ZIP pairs, or format a PMB / virtual mailbox address you are authorized to use.",
    startGenerating: "Start Generating",
    downloadSpellVPN: "Download SpellVPN",
    stateBoardAria: "Sales-tax-free state overview",
    localTaxCheck: "Local tax check",
    boundaryTitle: "Usage Boundary",
    boundaryText: "Test data mode generates complete addresses with common real city/ZIP pairs and natural synthetic street names and numbers. Test results should not be used for Apple Account, payment billing, tax, shipping, returns, or forwarding. Real address mode is only for formatting addresses that are real and authorized for you to use.",
    realSourcesTitle: "Real Address Sources",
    realSourcesLead: "If you do not have a real US address, use legitimate providers below. After signup, use the name + PMB/# + street address assigned to you. Do not copy a provider website, storefront, warehouse, or someone else's address directly.",
    cmraTitle: "CMRA / Private Mailbox",
    cmraText: "USPS explains that a Commercial Mail Receiving Agency can receive mail for customers. PMB signup commonly requires PS Form 1583 and identity verification.",
    cmraLink: "Read USPS CMRA guidance",
    upsTitle: "The UPS Store Mailbox",
    upsText: "UPS states that mailbox services can provide a real street address and identify your private mailbox with PMB or #.",
    upsLink: "Open UPS mailbox services",
    ipostalTitle: "iPostal1 Virtual Mailbox",
    ipostalText: "Choose a virtual mailbox / virtual address service, then use the assigned address and mailbox number after signup.",
    ipostalLink: "Open iPostal1",
    anytimeTitle: "Anytime Mailbox",
    anytimeText: "Search virtual mailbox locations by state. Prioritize Delaware, Oregon, Montana, New Hampshire, and Alaska.",
    locationListLink: "View locations",
    postscanTitle: "PostScan Mail",
    postscanText: "Offers virtual mailbox and address locations. Check state, cost, identity verification, and mail receiving rules before choosing.",
    uspsZipTitle: "USPS Address Check",
    uspsZipText: "After receiving an address, use USPS ZIP Code Lookup to check city, state, ZIP, and standardized formatting.",
    uspsZipLink: "Open USPS ZIP Lookup",
    pmbTitle: "PMB Format Tip",
    pmbText: "USPS Publication 28 says CMRA private mailbox addresses should include PMB or # plus your private mailbox number. Do not combine the CMRA suite number and your PMB number in one field.",
    pmbLink: "Read USPS PMB address format",
    generatorTitle: "Generate a Copyable Address",
    generatorLead: "Test data mode can generate a complete test address. Real address mode formats a PMB, virtual mailbox, company, school, or authorized receiving address you legally obtained.",
    testModeTitle: "One-Click Test Address",
    testModeText: "Automatically generates name, phone, street, city, state, and ZIP. City/ZIP pairs are common real combinations; street names are natural synthetic test data. Results are for development, form testing, layout previews, and tutorials only.",
    generateTest: "Generate Test Address",
    randomTaxFree: "Random Tax-Free State",
    realModeTitle: "Real Address Formatter",
    stateLabel: "Sales-Tax-Free State",
    cityZipLabel: "City / ZIP",
    nameField: "Name",
    namePlaceholder: "Enter your real name",
    streetField: "Real Street Address",
    streetPlaceholder: "Street number, street name, company, or authorized receiving address",
    line2Field: "Apt / Suite, optional",
    line2Placeholder: "Apt, Unit, Suite",
    phoneField: "Phone",
    phonePlaceholder: "A real reachable number",
    generateAddress: "Generate Address",
    clear: "Clear",
    resultTitle: "Address Result",
    copyFull: "Copy Full Format",
    copyFullAria: "Copy full generated format",
    copyLine: "Copy One-Line Address",
    copyLineAria: "Copy one-line address",
    save: "Save",
    saveAria: "Save generated result",
    initialResult: "Click “Generate Test Address”, or fill real address mode and click “Generate Address”.",
    localOnly: "Everything is generated locally in your browser. Nothing is uploaded or saved to a server.",
    savedTitle: "Saved Addresses",
    savedLead: "Saved entries stay in this browser only. Test data remains marked as TEST DATA.",
    exportJson: "Export JSON",
    clearSaved: "Clear Saved",
    tableType: "Type",
    tableName: "Name",
    tablePhone: "Phone",
    tableAddress: "Address",
    tableActions: "Actions",
    statesTitle: "Eligible Tax-Free States",
    statesLead: "These states have no statewide sales tax. Alaska has no statewide sales tax, but some local areas may charge local sales tax.",
    appleTitle: "Practical Tips for US App Store Accounts",
    noneTitle: "None",
    noneText: "Apple says None may appear when there is no purchase. In practice, connecting to a stable US IP before creating or first signing into a US App Store account may improve the chance of seeing None, but it is not guaranteed.",
    usIpTitle: "US IP",
    usIpText: "If the page keeps requiring a payment method, try a US IP, a different creation entry point, or signing out of Media & Purchases before retrying. If None still does not appear, follow Apple's current page requirements.",
    spellText: "If you need a US IP, you can download SpellVPN. SpellVPN Ultra is free on the App Store; the paid iOS and paid Mac versions use the same paid App Store listing.",
    ultraFree: "Ultra Free",
    iosPaid: "iOS paid version",
    macPaid: "Mac paid version",
    referencesTitle: "References",
    appleCreateSource: "Apple: How to create a new Apple Account",
    appleRegionSource: "Apple: Change your Apple Account country or region",
    applePaymentSource: "Apple: Payment methods for Apple Account",
    taxSource: "Tax Foundation: 2026 State Sales Tax Rates Midyear Update",
    cmraSource: "USPS: Commercial Mail Receiving Agency / PMB guidance",
    pmbSource: "USPS Publication 28: Private Mailbox Address format",
    footerPrivacy: "Generated locally. Not uploaded. Not saved to a server.",
    stateNotes: {
      DE: "Often a first-choice no-sales-tax state.",
      OR: "No statewide sales tax; commonly used for online billing examples.",
      MT: "No statewide sales tax; some industry-specific taxes may still apply.",
      NH: "No statewide sales tax; useful when a form only needs state, city, and ZIP formatting.",
      AK: "No statewide sales tax, but some cities or local areas may charge local sales tax."
    },
    taxNotes: {
      DE: "No statewide sales tax.",
      OR: "No statewide sales tax.",
      MT: "No statewide sales tax.",
      NH: "No statewide sales tax.",
      AK: "No statewide sales tax, but local sales taxes may apply."
    },
    chooseState: "Choose",
    dataStats: ({ stateCount, placeCount, nameCount, streetCount, combinationCount }) => `Current test pool: ${stateCount} sales-tax-free states, ${placeCount} common real city/ZIP pairs, ${nameCount} test names, ${streetCount} natural synthetic test street combinations, about ${combinationCount} random combinations.`,
    selectedPlace: ({ stateName, city }) => `Selected ${stateName} / ${city}. Continue with a real street address to generate.`,
    resultHeaderTest: "TEST DATA - DO NOT USE FOR BILLING, APPLE ACCOUNT, TAX, SHIPPING, RETURNS, OR FORWARDING",
    resultHeaderReal: "REAL / AUTHORIZED ADDRESS FORMAT",
    resultName: "Name",
    resultPhone: "Phone",
    resultStreet: "Street Address",
    resultLine2: "Address Line 2",
    resultCity: "City",
    resultState: "State",
    resultZip: "ZIP Code",
    resultCountry: "Country/Region",
    unitedStates: "United States",
    resultSalesTaxState: "Sales-tax state",
    resultTaxNote: "Tax note",
    resultFinalTest: "This is generated test data for development, form testing, layout previews, and tutorials only.",
    resultFinalReal: "Use only if this address is real and you are authorized to use it.",
    testGeneratedNote: "Test data generated. Do not use it for Apple Account, payment billing, tax, shipping, returns, or forwarding.",
    realGeneratedNote: "Real address format generated. Confirm you are authorized to use this address.",
    cannotGenerate: "Cannot generate a submittable address yet.",
    fillMissing: "Please complete:",
    noFakeFill: "To avoid fake billing addresses, this tool does not auto-fill street, door number, phone, or someone else's address.",
    realRequiredNote: "Tax-free state, city, and ZIP can be selected automatically; real street and contact information must come from you.",
    copyFirst: "Generate an address before copying.",
    copied: "Copied full format to clipboard.",
    copiedLine: "Copied one-line address to clipboard.",
    copyFailed: "Copy failed. You can manually select and copy the result.",
    savedEmpty: "No saved addresses yet",
    savedModeTest: "Test data",
    savedModeReal: "Real address",
    load: "Load",
    delete: "Delete",
    saveFirst: "Generate an address before saving.",
    savedNote: "Saved locally in this browser.",
    loadedTest: "Loaded test data.",
    loadedReal: "Loaded real address format."
  },
  ru: {
    docTitle: "Генератор адресов штатов США без налога",
    docDescription: "Помощник для адресов штатов США без налога с продаж: тестовая генерация и форматирование реальных PMB / виртуальных почтовых адресов.",
    brand: "Генератор адресов США без налога",
    brandAria: "Главная генератора адресов США без налога",
    navAria: "Навигация страницы",
    navGenerator: "Генератор",
    navSaved: "Сохранено",
    navSources: "Источники адресов",
    navStates: "Штаты без налога",
    navApple: "Apple советы",
    navReferences: "Источники",
    updated: "Проверено: 2026-07-29",
    heroTitle: "Помощник адресов штатов США без налога с продаж",
    heroLead: "Выберите Delaware, Oregon, Montana, New Hampshire или Alaska, чтобы создать тестовый адрес с реальной распространенной парой город/ZIP, или отформатировать PMB / виртуальный почтовый адрес, которым вы имеете право пользоваться.",
    startGenerating: "Начать",
    downloadSpellVPN: "Скачать SpellVPN",
    stateBoardAria: "Обзор штатов без налога с продаж",
    localTaxCheck: "Проверить местный налог",
    boundaryTitle: "Граница использования",
    boundaryText: "Режим тестовых данных создает полный адрес: город/ZIP берутся из реальных распространенных сочетаний, улица и номер являются естественно выглядящими синтетическими тестовыми данными. Тестовые результаты нельзя использовать для Apple Account, платежного адреса, налогов, доставки, возвратов или пересылки. Режим реального адреса только форматирует адрес, который реален и разрешен вам для использования.",
    realSourcesTitle: "Источники реального адреса",
    realSourcesLead: "Если у вас нет реального адреса в США, используйте легальные сервисы ниже. После регистрации используйте назначенные вам имя + PMB/# + street address. Не копируйте напрямую адрес сайта, магазина, склада или чужой адрес.",
    cmraTitle: "CMRA / частный почтовый ящик",
    cmraText: "USPS объясняет, что Commercial Mail Receiving Agency может получать почту для клиентов. Для PMB обычно нужны PS Form 1583 и проверка личности.",
    cmraLink: "Открыть руководство USPS CMRA",
    upsTitle: "Почтовый ящик The UPS Store",
    upsText: "UPS указывает, что mailbox services могут предоставить real street address и обозначить ваш ящик через PMB или #.",
    upsLink: "Открыть UPS mailbox services",
    ipostalTitle: "Виртуальный ящик iPostal1",
    ipostalText: "Выберите виртуальный почтовый ящик / виртуальный адрес, затем после регистрации используйте назначенный адрес и номер ящика.",
    ipostalLink: "Открыть iPostal1",
    anytimeTitle: "Anytime Mailbox",
    anytimeText: "Поиск виртуальных почтовых адресов по штатам. Сначала смотрите Delaware, Oregon, Montana, New Hampshire и Alaska.",
    locationListLink: "Смотреть локации",
    postscanTitle: "PostScan Mail",
    postscanText: "Предлагает виртуальные почтовые ящики и адресные локации. Перед выбором проверьте штат, цену, проверку личности и правила приема почты.",
    uspsZipTitle: "Проверка адреса USPS",
    uspsZipText: "После получения адреса используйте USPS ZIP Code Lookup для проверки города, штата, ZIP и стандартного формата.",
    uspsZipLink: "Открыть USPS ZIP Lookup",
    pmbTitle: "Подсказка по формату PMB",
    pmbText: "USPS Publication 28 говорит, что адрес частного ящика CMRA должен включать PMB или # и номер вашего ящика. Не смешивайте suite номер CMRA и ваш PMB номер в одном поле.",
    pmbLink: "Открыть формат PMB USPS",
    generatorTitle: "Создать адрес для копирования",
    generatorLead: "Режим тестовых данных создает полный тестовый адрес. Режим реального адреса форматирует легально полученный PMB, виртуальный ящик, адрес компании, школы или разрешенный адрес приема.",
    testModeTitle: "Тестовый адрес в один клик",
    testModeText: "Автоматически создает имя, телефон, улицу, город, штат и ZIP. Пары город/ZIP являются распространенными реальными сочетаниями; улицы являются естественными синтетическими тестовыми данными. Результаты только для разработки, тестирования форм, проверки макета и обучающих материалов.",
    generateTest: "Создать тестовый адрес",
    randomTaxFree: "Случайный штат без налога",
    realModeTitle: "Форматирование реального адреса",
    stateLabel: "Штат без налога с продаж",
    cityZipLabel: "Город / ZIP",
    nameField: "Имя",
    namePlaceholder: "Введите ваше настоящее имя",
    streetField: "Реальный street address",
    streetPlaceholder: "Номер, улица, компания или разрешенный адрес приема",
    line2Field: "Apt / Suite, необязательно",
    line2Placeholder: "Apt, Unit, Suite",
    phoneField: "Телефон",
    phonePlaceholder: "Реальный доступный номер",
    generateAddress: "Создать адрес",
    clear: "Очистить",
    resultTitle: "Результат адреса",
    copyFull: "Копировать полный формат",
    copyFullAria: "Копировать полный формат",
    copyLine: "Копировать одной строкой",
    copyLineAria: "Копировать адрес одной строкой",
    save: "Сохранить",
    saveAria: "Сохранить результат",
    initialResult: "Нажмите «Создать тестовый адрес» или заполните режим реального адреса и нажмите «Создать адрес».",
    localOnly: "Все создается локально в браузере. Ничего не загружается и не сохраняется на сервере.",
    savedTitle: "Сохраненные адреса",
    savedLead: "Сохраненные записи остаются только в этом браузере. Тестовые данные остаются помеченными как TEST DATA.",
    exportJson: "Экспорт JSON",
    clearSaved: "Очистить сохраненное",
    tableType: "Тип",
    tableName: "Имя",
    tablePhone: "Телефон",
    tableAddress: "Адрес",
    tableActions: "Действия",
    statesTitle: "Доступные штаты без налога",
    statesLead: "В этих штатах нет налога с продаж на уровне штата. В Alaska нет налога штата, но в некоторых местах может быть местный налог.",
    appleTitle: "Практические советы для аккаунта App Store США",
    noneTitle: "None / Нет",
    noneText: "Apple указывает, что None может появиться, если нет покупки. На практике стабильный IP США перед созданием или первым входом в аккаунт App Store США может повысить шанс увидеть None, но гарантии нет.",
    usIpTitle: "IP США",
    usIpText: "Если страница постоянно требует способ оплаты, попробуйте IP США, другой путь создания аккаунта или выйти из Media & Purchases перед повторной попыткой. Если None все равно нет, следуйте текущим требованиям страницы Apple.",
    spellText: "Если нужен IP США, можно скачать SpellVPN. SpellVPN Ultra бесплатен в App Store; платная iOS и платная Mac версии используют одну платную App Store listing.",
    ultraFree: "Ultra бесплатно",
    iosPaid: "Платная iOS-версия",
    macPaid: "Платная Mac-версия",
    referencesTitle: "Источники",
    appleCreateSource: "Apple: как создать новый Apple Account",
    appleRegionSource: "Apple: изменить страну или регион Apple Account",
    applePaymentSource: "Apple: способы оплаты для Apple Account",
    taxSource: "Tax Foundation: 2026 State Sales Tax Rates Midyear Update",
    cmraSource: "USPS: руководство Commercial Mail Receiving Agency / PMB",
    pmbSource: "USPS Publication 28: формат Private Mailbox Address",
    footerPrivacy: "Создается локально. Не загружается. Не сохраняется на сервере.",
    stateNotes: {
      DE: "Часто выбирается как штат без налога с продаж.",
      OR: "Нет налога с продаж на уровне штата; часто используется в примерах онлайн-биллинга.",
      MT: "Нет налога с продаж на уровне штата; отдельные отраслевые налоги могут применяться.",
      NH: "Нет налога с продаж на уровне штата; удобно, когда форме нужны штат, город и ZIP.",
      AK: "Нет налога с продаж на уровне штата, но некоторые города или районы могут взимать местный налог."
    },
    taxNotes: {
      DE: "Нет налога с продаж на уровне штата.",
      OR: "Нет налога с продаж на уровне штата.",
      MT: "Нет налога с продаж на уровне штата.",
      NH: "Нет налога с продаж на уровне штата.",
      AK: "Нет налога с продаж на уровне штата, но местные налоги могут применяться."
    },
    chooseState: "Выбрать",
    dataStats: ({ stateCount, placeCount, nameCount, streetCount, combinationCount }) => `Текущий тестовый пул: ${stateCount} штатов без налога, ${placeCount} распространенных реальных пар город/ZIP, ${nameCount} тестовых имен, ${streetCount} естественных синтетических комбинаций улиц, примерно ${combinationCount} случайных комбинаций.`,
    selectedPlace: ({ stateName, city }) => `Выбрано ${stateName} / ${city}. Заполните реальный street address для генерации.`,
    resultHeaderTest: "TEST DATA - НЕ ИСПОЛЬЗОВАТЬ ДЛЯ БИЛЛИНГА, APPLE ACCOUNT, НАЛОГОВ, ДОСТАВКИ, ВОЗВРАТОВ ИЛИ ПЕРЕСЫЛКИ",
    resultHeaderReal: "ФОРМАТ РЕАЛЬНОГО / РАЗРЕШЕННОГО АДРЕСА",
    resultName: "Имя",
    resultPhone: "Телефон",
    resultStreet: "Street Address",
    resultLine2: "Address Line 2",
    resultCity: "Город",
    resultState: "Штат",
    resultZip: "ZIP Code",
    resultCountry: "Страна/регион",
    unitedStates: "United States",
    resultSalesTaxState: "Штат без налога",
    resultTaxNote: "Налоговая заметка",
    resultFinalTest: "Это сгенерированные тестовые данные только для разработки, тестирования форм, проверки макета и обучающих материалов.",
    resultFinalReal: "Используйте только если адрес реален и вы имеете право им пользоваться.",
    testGeneratedNote: "Тестовые данные созданы. Не используйте их для Apple Account, платежного адреса, налогов, доставки, возвратов или пересылки.",
    realGeneratedNote: "Формат реального адреса создан. Подтвердите, что вы имеете право использовать этот адрес.",
    cannotGenerate: "Пока нельзя создать адрес для отправки.",
    fillMissing: "Сначала заполните:",
    noFakeFill: "Чтобы избежать фиктивных платежных адресов, инструмент не заполняет автоматически улицу, номер, телефон или чужой адрес.",
    realRequiredNote: "Штат без налога, город и ZIP можно выбрать автоматически; реальная улица и контактные данные должны быть вашими.",
    copyFirst: "Сначала создайте адрес, затем копируйте.",
    copied: "Полный формат скопирован в буфер обмена.",
    copiedLine: "Адрес одной строкой скопирован в буфер обмена.",
    copyFailed: "Не удалось скопировать. Можно выделить и скопировать результат вручную.",
    savedEmpty: "Сохраненных адресов пока нет",
    savedModeTest: "Тестовые данные",
    savedModeReal: "Реальный адрес",
    load: "Загрузить",
    delete: "Удалить",
    saveFirst: "Сначала создайте адрес, затем сохраняйте.",
    savedNote: "Сохранено локально в этом браузере.",
    loadedTest: "Тестовые данные загружены.",
    loadedReal: "Формат реального адреса загружен."
  }
};

const supportedLanguages = Object.keys(translations);
const storageKey = "usTaxFreeAddressGenerator.saved";
const languageStorageKey = "usTaxFreeAddressGenerator.lang";
const urlLang = new URLSearchParams(window.location.search).get("lang");
let currentLang = supportedLanguages.includes(urlLang)
  ? urlLang
  : supportedLanguages.includes(localStorage.getItem(languageStorageKey))
    ? localStorage.getItem(languageStorageKey)
    : "zh-Hans";

const byId = (id) => document.getElementById(id);
const stateSelect = byId("stateSelect");
const citySelect = byId("citySelect");
const fullName = byId("fullName");
const addressLine1 = byId("addressLine1");
const addressLine2 = byId("addressLine2");
const phoneNumber = byId("phoneNumber");
const resultBox = byId("resultBox");
const resultNote = byId("resultNote");
const copyBtn = byId("copyBtn");
const copyLineBtn = byId("copyLineBtn");
let currentResult = null;

function t(key) {
  return translations[currentLang][key] ?? translations["zh-Hans"][key] ?? key;
}

function getState(code = stateSelect.value) {
  return states.find((state) => state.code === code) || states[0];
}

function getTaxNote(code) {
  return t("taxNotes")[code] || "";
}

function getPlace() {
  const [city, zip] = citySelect.value.split("|");
  return { city, zip };
}

function fillStateOptions() {
  const selected = stateSelect.value || "DE";
  stateSelect.innerHTML = states
    .map((state) => `<option value="${state.code}">${state.name} - ${state.code}</option>`)
    .join("");
  stateSelect.value = states.some((state) => state.code === selected) ? selected : "DE";
  fillCityOptions();
}

function fillCityOptions(preferredValue = citySelect.value) {
  const state = getState();
  citySelect.innerHTML = state.places
    .map((place) => `<option value="${place.city}|${place.zip}">${place.city} / ${place.zip}</option>`)
    .join("");
  if (preferredValue && [...citySelect.options].some((option) => option.value === preferredValue)) {
    citySelect.value = preferredValue;
  }
}

function renderStateGrid() {
  const grid = byId("stateGrid");
  grid.innerHTML = states
    .map((state) => {
      const sample = state.places[0];
      return `
        <article class="state-card">
          <strong>${state.code}</strong>
          <h3>${state.name}</h3>
          <p>${t("stateNotes")[state.code]}</p>
          <p>${sample.city} / ${sample.zip}</p>
          <button class="button secondary" type="button" data-state="${state.code}">${t("chooseState")} ${state.code}</button>
        </article>
      `;
    })
    .join("");
}

function randomizeTaxFreePlace() {
  const state = states[Math.floor(Math.random() * states.length)];
  stateSelect.value = state.code;
  fillCityOptions();
  const randomPlace = state.places[Math.floor(Math.random() * state.places.length)];
  citySelect.value = `${randomPlace.city}|${randomPlace.zip}`;
  resultNote.textContent = t("selectedPlace")({ stateName: state.name, city: randomPlace.city });
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomStreetName() {
  return `${pick(testStreetRoots)} ${pick(testStreetSuffixes)}`;
}

function dataPoolStats() {
  const placeCount = states.reduce((total, state) => total + state.places.length, 0);
  const streetCount = testStreetRoots.length * testStreetSuffixes.length;
  const doorCount = 880;
  const phoneCount = 9000;
  return {
    stateCount: states.length,
    placeCount,
    nameCount: testNames.length,
    streetCount,
    doorCount,
    phoneCount,
    combinationCount: BigInt(testNames.length) * BigInt(placeCount) * BigInt(streetCount) * BigInt(doorCount) * BigInt(phoneCount)
  };
}

function renderDataStats() {
  const stats = dataPoolStats();
  const node = byId("dataStats");
  if (!node) return;
  const locale = currentLang === "zh-Hans" ? "zh-CN" : currentLang === "ru" ? "ru-RU" : "en-US";
  node.textContent = t("dataStats")({
    ...stats,
    combinationCount: stats.combinationCount.toLocaleString(locale)
  });
}

function buildAddressText(result) {
  const lines = [
    result.mode === "test" ? t("resultHeaderTest") : t("resultHeaderReal"),
    "",
    `${t("resultName")}: ${result.name}`,
    `${t("resultPhone")}: ${result.phone}`,
    `${t("resultStreet")}: ${result.street}`,
    result.line2 ? `${t("resultLine2")}: ${result.line2}` : "",
    `${t("resultCity")}: ${result.city}`,
    `${t("resultState")}: ${result.stateCode} (${result.stateName})`,
    `${t("resultZip")}: ${result.zip}`,
    `${t("resultCountry")}: ${t("unitedStates")}`,
    "",
    `${t("resultSalesTaxState")}: ${result.stateName}`,
    `${t("resultTaxNote")}: ${getTaxNote(result.stateCode)}`,
    "",
    result.mode === "test" ? t("resultFinalTest") : t("resultFinalReal")
  ];
  return lines.filter(Boolean).join("\n");
}

function buildOneLineAddress(result) {
  const parts = [
    result.name,
    result.street,
    result.line2,
    result.city,
    `${result.stateCode} ${result.zip}`,
    t("unitedStates"),
    result.phone
  ];
  return parts.filter(Boolean).join(", ");
}

function generateTestAddress() {
  const state = getState();
  const place = pick(state.places);
  citySelect.value = `${place.city}|${place.zip}`;
  const number = Math.floor(100 + Math.random() * 880);
  const lastFour = String(1000 + Math.floor(Math.random() * 9000));
  currentResult = {
    mode: "test",
    name: pick(testNames),
    phone: `(${areaCodes[state.code]}) 555-${lastFour}`,
    street: `${number} ${randomStreetName()}`,
    line2: "",
    city: place.city,
    stateCode: state.code,
    stateName: state.name,
    zip: place.zip
  };
  resultBox.textContent = buildAddressText(currentResult);
  resultNote.textContent = t("testGeneratedNote");
}

function randomizeTestState() {
  randomizeTaxFreePlace();
  generateTestAddress();
}

function requiredMissing() {
  const missing = [];
  if (!fullName.value.trim()) missing.push(t("nameField"));
  if (!addressLine1.value.trim()) missing.push(t("streetField"));
  if (!phoneNumber.value.trim()) missing.push(t("phoneField"));
  return missing;
}

function generateAddress() {
  const missing = requiredMissing();
  if (missing.length) {
    resultBox.textContent = [
      t("cannotGenerate"),
      "",
      t("fillMissing"),
      ...missing.map((item) => `- ${item}`),
      "",
      t("noFakeFill")
    ].join("\n");
    resultNote.textContent = t("realRequiredNote");
    return;
  }

  const state = getState();
  const place = getPlace();
  currentResult = {
    mode: "real",
    name: fullName.value.trim(),
    phone: phoneNumber.value.trim(),
    street: addressLine1.value.trim(),
    line2: addressLine2.value.trim(),
    city: place.city,
    stateCode: state.code,
    stateName: state.name,
    zip: place.zip
  };

  resultBox.textContent = buildAddressText(currentResult);
  resultNote.textContent = t("realGeneratedNote");
}

async function copyResult() {
  const text = resultBox.textContent.trim();
  if (!currentResult || !text) {
    resultNote.textContent = t("copyFirst");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    resultNote.textContent = t("copied");
  } catch {
    resultNote.textContent = t("copyFailed");
  }
}

async function copyOneLineAddress() {
  if (!currentResult) {
    resultNote.textContent = t("copyFirst");
    return;
  }

  try {
    await navigator.clipboard.writeText(buildOneLineAddress(currentResult));
    resultNote.textContent = t("copiedLine");
  } catch {
    resultNote.textContent = t("copyFailed");
  }
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveAll(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSaved() {
  const list = byId("savedList");
  const saved = loadSaved();
  if (!saved.length) {
    list.innerHTML = `<tr><td colspan="5">${t("savedEmpty")}</td></tr>`;
    return;
  }
  list.innerHTML = saved
    .map((item, index) => {
      const address = `${item.street}${item.line2 ? ", " + item.line2 : ""}, ${item.city}, ${item.stateCode} ${item.zip}`;
      return `
        <tr>
          <td>${item.mode === "test" ? t("savedModeTest") : t("savedModeReal")}</td>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.phone)}</td>
          <td>${escapeHtml(address)}</td>
          <td>
            <button class="button secondary" type="button" data-load="${index}">${t("load")}</button>
            <button class="button ghost" type="button" data-delete="${index}">${t("delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function saveCurrentResult() {
  if (!currentResult) {
    resultNote.textContent = t("saveFirst");
    return;
  }
  const saved = loadSaved();
  saved.unshift({ ...currentResult, createdAt: new Date().toISOString() });
  saveAll(saved.slice(0, 50));
  renderSaved();
  resultNote.textContent = t("savedNote");
}

function loadSavedResult(index) {
  const saved = loadSaved();
  const item = saved[index];
  if (!item) return;
  currentResult = item;
  resultBox.textContent = buildAddressText(item);
  resultNote.textContent = item.mode === "test" ? t("loadedTest") : t("loadedReal");
}

function deleteSavedResult(index) {
  const saved = loadSaved();
  saved.splice(index, 1);
  saveAll(saved);
  renderSaved();
}

function exportSaved() {
  const saved = loadSaved();
  const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "us-tax-free-addresses.json";
  link.click();
  URL.revokeObjectURL(url);
}

function translateStaticContent() {
  document.documentElement.lang = currentLang;
  document.title = t("docTitle");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("docDescription"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLang);
  });
}

function refreshDynamicContent() {
  fillStateOptions();
  renderStateGrid();
  renderSaved();
  renderDataStats();
  if (currentResult) {
    resultBox.textContent = buildAddressText(currentResult);
    resultNote.textContent = currentResult.mode === "test" ? t("testGeneratedNote") : t("realGeneratedNote");
  } else {
    resultBox.textContent = t("initialResult");
    resultNote.textContent = t("localOnly");
  }
}

function setLanguage(language, persist = true) {
  if (!supportedLanguages.includes(language)) return;
  currentLang = language;
  if (persist) localStorage.setItem(languageStorageKey, language);
  translateStaticContent();
  refreshDynamicContent();
}

stateSelect.addEventListener("change", () => fillCityOptions());
byId("randomBtn").addEventListener("click", randomizeTaxFreePlace);
byId("generateBtn").addEventListener("click", generateAddress);
byId("testGenerateBtn").addEventListener("click", generateTestAddress);
byId("testRandomStateBtn").addEventListener("click", randomizeTestState);
copyBtn.addEventListener("click", copyResult);
copyLineBtn.addEventListener("click", copyOneLineAddress);
byId("saveBtn").addEventListener("click", saveCurrentResult);
byId("exportBtn").addEventListener("click", exportSaved);
byId("clearSavedBtn").addEventListener("click", () => {
  saveAll([]);
  renderSaved();
});
byId("savedList").addEventListener("click", (event) => {
  const loadButton = event.target.closest("button[data-load]");
  const deleteButton = event.target.closest("button[data-delete]");
  if (loadButton) loadSavedResult(Number(loadButton.dataset.load));
  if (deleteButton) deleteSavedResult(Number(deleteButton.dataset.delete));
});
byId("stateGrid").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-state]");
  if (!button) return;
  stateSelect.value = button.dataset.state;
  fillCityOptions();
  document.querySelector("#generator").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});
byId("resetBtn").addEventListener("click", () => {
  window.setTimeout(() => {
    stateSelect.value = "DE";
    fillCityOptions();
    currentResult = null;
    resultBox.textContent = t("initialResult");
    resultNote.textContent = t("localOnly");
  }, 0);
});

setLanguage(currentLang, false);
