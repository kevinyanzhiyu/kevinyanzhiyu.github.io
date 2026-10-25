const groups = [
  { id: "system-work", code: "A", title: "系统功能", label: "GAME SYSTEMS", kind: "system" },
  { id: "live-ops", code: "B", title: "运营活动", label: "LIVE OPS", kind: "live-ops" },
];

const shelterScreens = [
  { title: "常规事件与可交互状态", label: "INTERACTION", note: "在场景中直接呈现工作点、升级需求和可交互图标，顶部任务条持续显示当前目标与进度。" },
  { title: "摇杆交互引导", label: "GUIDANCE", note: "通过手势、轨迹与 Swipe to move 提示，将移动方式放在玩家当前所在的场景中说明。" },
  { title: "物品补给与场景交互点", label: "SUPPLY & INTERACTION", note: "红色禁用图标表示该位置缺少对应物品，需要玩家前往仓库取货并补充；地面的圆圈是交互点，玩家通过摇杆移动至该位置进行交互。资源飞字则反馈本次获得的数量。" },
  { title: "当前无房间提示", label: "UNAVAILABLE STATE", note: "把 No Room Currently 提示放在接待台附近，让玩家在需要操作的位置看到当前限制。" },
  { title: "任务完成的瞬时反馈", label: "TASK COMPLETION", note: "任务达成时，蓝色任务条瞬间切换为带勾选标记的绿色完成态，短暂反馈后切换到下一个任务。场景中的资源需求与满足标记用于说明当前交互条件。" },
  { title: "全部交互状态汇总", label: "INTERACTION STATE MAP", note: "汇总资源消耗、地块事件、搬运事件与工作事件的全部交互状态：包含单一及多种资源需求、地块上锁、剧情事件确认、搬运交互点、当前无资源、招募进度、工作进行中及收获反馈。" },
  { title: "房间升级反馈", label: "UPGRADE", note: "在同一弹窗中对照展示升级前后的星数、等级与收益，让本次升级带来的变化可以直接比较。" },
  { title: "星星之路入口", label: "PROGRESSION ENTRY", note: "将星星入口放在场景右侧，与核心场景操作分区，作为成长奖励系统的固定入口。" },
  { title: "星星之路与阶段奖励", label: "PROGRESSION", note: "用竖向等级轴串联成长节点，展示当前阶段、后续加成与奖励，并将领取操作集中在底部。" },
  { title: "成长加成汇总", label: "BONUS OVERVIEW", note: "将诊所加成和其他加成分类列出，用条目展示具体数值，便于查看累计成长收益。" },
  { title: "星星不足与获取路径", label: "RECOVERY PATH", note: "同时展示所需星数、当前进度和可前往的获取途径，GO 按钮为资源不足状态提供下一步行动。" },
  { title: "成长奖励确认", label: "REWARD", note: "将属性加成与资源奖励集中呈现，通过奖励弹窗确认本次成长获得的内容。" },
  { title: "商人档位礼包", label: "OFFER SELECTION", note: "以三档资源卡片呈现可选方案，选中态与下方数量、奖励和价格形成对应，便于比较当前选择。", image: "assets/projects/shelter/merchant.webp" },
].map((screen, index) => ({ ...screen, image: screen.image || `assets/projects/shelter/state-${String(index + 1).padStart(2, "0")}.webp` })).filter(screen => screen.label !== "PROGRESSION ENTRY");

const projects = [
{ id: "shelter-check", group: "system", title: "Shelter Check模拟经营玩法", product: "Shelter Check", image: "assets/projects/shelter/all-states.jpg", cover: "assets/projects/shelter/cover.webp", banner: "assets/projects/shelter/cover-original.png", video: "assets/videos/shelter-check-demo-fixed.mp4", videoStream: "assets/videos/shelter-hd/index.m3u8", demoFirst: true, screens: shelterScreens, alt: "Shelter Check模拟经营玩法全状态汇总", summary: "负责 SLG 前期的避难所模拟经营体验：通过摇杆移动串联难民收纳、治疗与建设养成，再由工作人员自动化逐步衔接 SLG 玩法。", overview: "我负责这款 SLG 前期的避难所模拟经营玩法，涵盖难民收纳与避难所养成。玩家主要通过滑动摇杆移动，利用手中的资源完成升级建设、治疗与前台接诊，无需频繁点击。随着经营资金积累，玩家可雇佣其他工作人员，逐步形成自动化，并慢慢转向后续 SLG 玩法。", challenge: "核心设计问题是让玩家通过移动理解经营循环：找到交互点、判断所需物品、前往仓库补货，再投入资源完成工作。同时让任务切换、建设成长与雇佣自动化逐步展开，帮助玩家从亲手经营过渡到后续 SLG。", flow: [{ title: "摇杆移动 · 接诊收纳", note: "移动至前台交互点，接诊并收纳难民。" }, { title: "仓库取货 · 场景补给", note: "识别缺少的物品，取货后返回对应交互点。" }, { title: "治疗照料 · 建设升级", note: "投入携带资源，完成治疗与避难所养成。" }, { title: "积累资金 · 雇佣员工", note: "逐步雇佣工作人员，形成自动化经营。" }, { title: "经营成长 · 衔接 SLG", note: "从亲手经营逐步过渡到后续 SLG 玩法。" }], decisions: [
    { title: "用移动串联经营操作", text: "玩家主要通过滑动摇杆移动，在场景交互点完成资源投入、治疗与前台接诊，减少反复点击，让操作沿着角色的行动路线连续发生。" },
    { title: "缺什么、去哪补，在现场说清楚", text: "地面圆圈标明交互位置，物品缺失图标提示前往仓库补货；资源需求、工作进度与收获反馈贴近对应事件，帮助玩家判断下一步行动。" },
    { title: "从亲手经营走向自动化", text: "早期亲自接诊、治疗并投入资源建设避难所；随着资金积累雇佣工作人员，逐步形成自动化经营，再衔接后续 SLG 玩法。任务完成时用短暂绿色反馈确认进展，并及时切换下一目标。" }
  ], screenIntro: "从摇杆移动、场景补给和任务完成，到全部交互状态汇总与养成反馈，展示前期避难所经营的操作与信息表达。", tags: ["SIMULATION UX", "STATE DESIGN"], role: "Game UX", platform: "Mobile", stage: "已上线" },
  { id: "kingdom", group: "system", title: "王者之地玩法", product: "AGE OF APES", image: "assets/projects/kingdom/full-flow.webp", cover: "assets/projects/kingdom-cover.webp", banner: "assets/projects/kingdom-cover.webp", flowImage: true, alt: "王者之地完整界面流程图：报名组队、匹配、战场与结算分支", summary: "把单人／小队报名、跨服匹配、建筑争夺与多层结算串成完整的多人战场体验。", overview: "王者之地是一套从赛前报名延伸到战后结算的跨服对抗玩法。活动页提供单人报名与多人组队路径，玩家选择参与时间后进入匹配，再在战场中判断建筑归属、占领条件与 BOSS 目标。战后通过段位变化、个人奖励、小队表现、MVP 和双方数据回看结果。我将报名、匹配、战场与结算的状态分支组织在完整流程中，保持跨阶段操作的连续性。", challenge: "我的设计重点是让不同阶段的下一步都清楚：赛前区分单人和小队的报名状态，匹配后明确何时可入场，战中让归属、目标价值与操作条件便于判断，结算再分层呈现胜负、成长与贡献。", flow: [{ title: "活动入口 · 选择路径", note: "查看段位与活动信息，选择单人报名或多人组队。" }, { title: "报名确认 · 参与时间", note: "选择参战时间；小队内展示成员和报名状态。" }, { title: "匹配等待 · 到时入场", note: "对比双方信息，通过倒计时与入场按钮表达阶段变化。" }, { title: "战场操作 · 目标判断", note: "结合 HUD、建筑归属、增益与 BOSS 信息选择行动。" }, { title: "战况地图 · 调整路线", note: "展开地图和双方数据，查看目标分布与局势。" }, { title: "结果结算 · 贡献复盘", note: "依次确认胜负、段位与奖励，再查看个人和团队表现。" }], decisions: [
    { title: "同一入口，解释两条报名路径", text: "活动主界面区分单人报名与多人组队；选时弹窗只处理参战时间，小队界面再呈现成员与报名状态。匹配期和对战期沿用活动页结构，通过倒计时、双方信息和入口变化说明下一步。" },
    { title: "先识别目标，再判断能否行动", text: "常驻 HUD 承担比分、时间与方位；地图建筑通过颜色与标记表达归属。点击目标后，再展开增益、奖励、占领进度或限制条件，让集结、攻击与前往对应当前状态。" },
    { title: "结算分层，兼顾成长与团队贡献", text: "先反馈胜负与段位变化，再展示个人积分和奖励；小队表现、MVP 与双方数据分别回答队友表现、突出贡献和阵营差距，避免在一页里堆叠所有信息。" }
  ], screens: [
    { image: "assets/projects/kingdom/screen-02.webp", label: "PRE-MATCH / ENTRY", title: "活动入口与两条报名路径", note: "左侧段位形成个人成长目标，右侧活动区同时提供单人报名和多人组队。当前活动信息与操作入口集中在主界面，玩家先决定以什么方式参战。" },
    { image: "assets/projects/kingdom/screen-03.webp", label: "PRE-MATCH / SCHEDULE", title: "报名时间选择", note: "选时弹窗将参战时段列为可选择条目，并保留 UTC 提示与确认按钮。把选时从活动介绍中独立出来，让一次确认聚焦于本场参与时间。" },
    { image: "assets/projects/kingdom/screen-07.webp", label: "PRE-MATCH / TEAM FINDER", title: "寻找小队与创建入口", note: "队伍名单与加入操作放在右侧，快速加入和创建小队放在左侧，区分“加入现有队伍”与“组织自己的队伍”两种目标。" },
    { image: "assets/projects/kingdom/screen-10.webp", label: "PRE-MATCH / REGISTERED", title: "小队成员与已报名状态", note: "成员卡片并列展示身份、战力与段位，邀请入口延续相同位置；底部显示报名状态与时间，使队伍准备情况与报名结果可以同时确认。" },
    { image: "assets/projects/kingdom/screen-12.webp", label: "MATCHING / WAITING", title: "匹配期的等待与预期", note: "活动页切换为双方阵营对比，展示战力、人数与距离入场的倒计时。此时按钮为开赛提醒，说明当前仍处于等待阶段。" },
    { image: "assets/projects/kingdom/screen-14.webp", label: "MATCHING / ENTER", title: "对战期的入场入口", note: "沿用匹配期的双方信息结构，将核心按钮切换为进入战场。通过按钮语义变化表达“可以行动了”，无需重新学习一个页面。" },
    { image: "assets/projects/kingdom/screen-15.webp", label: "BATTLE / HUD", title: "战场常驻 HUD", note: "顶部分区呈现双方比分和剩余时间，右上保留小地图，左侧呈现任务，底部集中部队与功能入口。信息围绕地图边缘布置，保留中央操作空间。" },
    { image: "assets/projects/kingdom/screen-17.webp", label: "BATTLE / OWNERSHIP", title: "建筑归属与地图目标", note: "建筑上的红蓝阵营标记、分值及占领提示共同表达目标状态。玩家在地图层先判断归属与目标价值，再进入弹窗查看具体条件。" },
    { image: "assets/projects/kingdom/screen-19.webp", label: "BATTLE / BUILDING", title: "建筑详情与攻击决策", note: "建筑弹窗按目标身份、占领方与效果、个人奖励组织信息，底部提供集结与攻击。让玩家在发起操作前看到目标收益与当前归属。" },
    { image: "assets/projects/kingdom/screen-36.webp", label: "BATTLE / REQUIREMENT", title: "限制条件与可执行操作", note: "同类建筑保留一致详情结构，通过条件提示解释当前操作门槛，并呈现前往入口。限制原因贴近操作区，避免只给出不可操作的结果。" },
    { image: "assets/projects/kingdom/screen-20.webp", label: "BATTLE / BOSS", title: "BOSS 目标与奖励预览", note: "BOSS 使用与建筑相近的信息骨架，但替换为对应目标形象、奖励与行动入口。以一致阅读顺序承载不同目标，降低切换时的理解成本。" },
    { image: "assets/projects/kingdom/screen-23.webp", label: "BATTLE / SITUATION", title: "侧栏战况与双方对比", note: "战况侧栏将目标分布与双方数据并列呈现，展开后仍保留地图上下文。适合在战斗中快速查看局势，再回到地图操作。" },
    { image: "assets/projects/kingdom/screen-25.webp", label: "BATTLE / EXPANDED MAP", title: "展开地图与路线判断", note: "放大地图集中展示建筑位置、阵营控制与角色位置，使整体目标关系更容易辨认；常驻 HUD 继续保留时间和比分，支持局部操作与全局判断切换。" },
    { image: "assets/projects/kingdom/screen-27.webp", label: "RESULT / RANK", title: "胜负反馈与段位变化", note: "先以胜利标题和段位徽章强化结果，再通过星数、进度与分项变化说明段位结算。情绪反馈与成长结果在同一阅读路径中展开。" },
    { image: "assets/projects/kingdom/screen-28.webp", label: "RESULT / PERSONAL", title: "个人表现与奖励兑现", note: "保留段位结果作为左侧锚点，右侧呈现个人积分、排名以及积分奖励和胜利奖励。把“表现如何”与“得到什么”明确关联。" },
    { image: "assets/projects/kingdom/screen-29.webp", label: "RESULT / SQUAD", title: "小队表现对比", note: "延续赛前的成员卡片结构，将重点切换到成员积分、排名与段位。用熟悉的队伍布局呈现战后贡献，便于同队成员之间比较。" },
    { image: "assets/projects/kingdom/screen-31.webp", label: "RESULT / MVP", title: "MVP 的独立荣誉时刻", note: "角色立绘、玩家身份与关键表现形成单独展示页。与数据列表区分呈现，为突出贡献提供更鲜明的个人反馈。" },
    { image: "assets/projects/kingdom/screen-32.webp", label: "RESULT / TEAM DATA", title: "双方数据与阵营复盘", note: "沿用红蓝阵营对照，逐项展示双方战场数据与最终胜负。将个人贡献视角扩展为阵营整体表现，补齐战后复盘层次。" }
  ], screenIntro: "从赛前准备到战后复盘，我通过状态切换、目标详情与分层结算，让玩家在每个阶段都能找到下一步操作。", tags: ["BATTLE UX", "HUD"], role: "Game UX", platform: "Mobile", stage: "已上线" },
  { id: "alliance", group: "system", title: "帮派系统优化", product: "AGE OF APES", image: "assets/projects/alliance-main-after.webp", alt: "帮派系统全屏改版主界面", summary: "让核心系统拥有匹配其重要性的全屏体验，系统性重构帮派的视觉表现、信息组织与操作意图。", overview: "帮派是游戏中的核心功能，但旧版将大量资料和功能挤在一个小弹窗内：帮派身份不够突出，信息混杂，玩家也难以明确下一步操作。此次优化从系统定位出发，将其升级为更有规模感与品质感的全屏空间，同时梳理主界面、集结与宝箱的结构，让视觉表现和操作体验一起提升。", challenge: "我将帮派定位为重要的长期协作系统，为它提供与其地位相称的全屏展示空间。先从小弹窗升级为全屏框架，再重新安排身份展示、信息层级与功能导航，让玩家看得清楚，也知道该做什么。", redesign: true, flow: [], decisions: [
    { title: "视觉：给核心系统足够的排场", text: "以全屏布局承载帮派系统，放大旗帜与身份展示，建立更鲜明的视觉重心和空间层次。让重要功能具备匹配其地位的规模感与品质感。" },
    { title: "结构：让身份、资料与功能各就其位", text: "将原本挤在弹窗里的内容重新分区，使用稳定的侧边导航承载功能切换，帮派身份与当前页面内容明确分开，降低不同信息同时争夺注意力的问题。" },
    { title: "操作：让每个页面的主要意图清楚", text: "主界面突出帮派概况与功能方向；集结页围绕查看目标、判断状态与参与组织列表；宝箱页围绕奖励进度与领取组织内容。视觉层级服务于页面任务，而不是单纯放大原界面。" }
  ], tags: ["UI REDESIGN", "VISUAL HIERARCHY"], role: "Game UX / UI", platform: "Mobile", stage: "已上线", comparisons: [
    { title: "帮派主界面", before: "assets/projects/alliance-main-before.webp", after: "assets/projects/alliance-main-after.webp", note: "从拥挤的小弹窗升级为全屏空间：放大帮派旗帜与身份展示，以侧边导航整合功能，将核心资料独立组织，提升核心系统的规模感与信息秩序。" },
    { title: "帮派集结", before: "assets/projects/alliance-rally-before.webp", after: "assets/projects/alliance-rally-after.webp", note: "以卡片列表呈现发起者、目标、兵量与倒计时，区分取消、加入和已加入状态。" },
    { title: "帮派宝箱", before: "assets/projects/alliance-chests-before.webp", after: "assets/projects/alliance-chests-after.webp", note: "集中呈现宝箱等级、进度与领取状态，突出一键领取入口。" }
  ] },
  {"id":"layout","group":"system","title":"城内布局功能","product":"AGE OF APES","image":"assets/projects/city-layout.jpg","video":"assets/videos/city-layout.mp4","editorDesign":true,"alt":"城内布局编辑工具与城市画布","summary":"围绕城市画布设计一套编辑工具：区分操作模式、明确预览与提交，并把方案管理和繁荣度反馈接入同一体验。","overview":"玩家可以管理多套城市布局，在城市画布中选择建筑、装饰与道路进行编辑，并通过保存与启用决定方案如何使用。方案还覆盖参观其他城市与替换布局，以及繁荣度数值、成就和规则。设计重点是让玩家理解当前模式、正在修改的对象，以及编辑结果是否已经生效。我将方案管理、场景编辑和结果生效分层组织，避免选中、保存与启用之间的含义混淆。","challenge":"我围绕工具、状态与结果的关系组织这套编辑器。右侧承载整体方案工具，底部承载对象选择，对象附近提供局部操作；在铺路、删除等模式间保持清楚的状态反馈，再用方案预览和独立的保存／启用操作区分编辑过程与最终生效。","flow":[{"title":"操作模式与工具分层","note":"整体工具、对象选择、局部操作各有位置；工具栏收起后，城市观察空间得以保留。"},{"title":"预览、确认与生效分离","note":"铺路时先预览再确认；方案选中、编辑、保存和启用表达不同含义，避免状态混淆。"},{"title":"自由编辑与成长反馈衔接","note":"对象价值、场景增长与阶段成就串联繁荣度反馈，规则在需要时单独展开。"}],"decisions":[{"title":"场景是主角，工具按范围组织","text":"右侧工具管理整体编辑环境，底部列表选择建筑与装饰，局部按钮跟随选中对象。可收起的工具栏兼顾操作效率和城市观察。"},{"title":"让模式状态持续可见","text":"道路网格、局部工具、取消／确认按钮和删除勾选持续说明当前操作。重点是让玩家在点击之前知道会发生什么，而不只在结束时提示结果。"},{"title":"把方案与成长管理放在合适层级","text":"方案列表承担预览、编辑与启用；繁荣度在选择对象和完成编辑时反馈，成就和规则按需展开。高频编辑与低频管理保持关联，又避免挤占同一画布。"}],"screens":[{"image":"assets/projects/layout/screen-01.webp","label":"PLAN / ACTIVE","title":"使用中的布局与待选方案","note":"方案列表、城市预览和使用中标记共同表达当前状态，编辑与启用作为独立操作保留。区分“正在查看哪套方案”和“城市实际使用哪套方案”。"},{"image":"assets/projects/layout/screen-02.webp","label":"PLAN / SELECTED","title":"选中其他布局时的操作","note":"切换列表项后，预览随之变化，而使用中的标记仍指向原方案。选中不等于生效，玩家可先查看，再决定编辑或启用。"},{"image":"assets/projects/layout/screen-03.webp","label":"PLAN / INCOMPLETE","title":"未完成布局的状态提示","note":"未完成方案在预览顶部显示红色提示，将方案状态放在最终决策前。编辑和启用位于固定位置，状态差异通过预览区说明。"},{"image":"assets/projects/layout/screen-04.webp","label":"EDITOR / TOOLS","title":"展开工具栏：集中管理编辑动作","note":"右侧展开删除模式、移除全部、相机模式、保存与启用等工具，底部保留对象选择。将场景内编辑和整体方案操作分区，便于查找。"},{"image":"assets/projects/layout/screen-05.webp","label":"EDITOR / CANVAS","title":"收起工具栏：把空间还给城市","note":"右侧工具区可收起，场景获得更完整的观察空间，底部对象栏继续保留。兼顾找工具和看布局两种编辑需求。"},{"image":"assets/projects/layout/screen-06.webp","label":"EDITOR / DECORATION","title":"装饰分类与对象选择","note":"底部切换到装饰分类，缩略图、数量与繁荣度信息集中在对象栏，城市仍是主要编辑区域。选择对象时保留摆放上下文。"},{"image":"assets/projects/layout/screen-07.webp","label":"ROAD / SELECTION","title":"选中路面与局部编辑工具","note":"选中道路后展示网格、对象名称和局部操作按钮，把针对当前道路的动作放在对象附近，与右侧整体方案工具区分。"},{"image":"assets/projects/layout/screen-08.webp","label":"ROAD / CONFIRM","title":"铺路中的预览与确认","note":"铺路时在网格中预览本次道路范围，并显示红色取消与绿色确认。编辑过程先可见，再提交结果，减少对操作是否完成的不确定感。"},{"image":"assets/projects/layout/screen-09.webp","label":"ROAD / DIRECTION","title":"整排路面的方向调整","note":"道路整排操作配合方向标记与局部按钮呈现，玩家可以围绕当前选中对象调整路面。把方向反馈放回场景，避免只在工具栏中表达。"},{"image":"assets/projects/layout/screen-10.webp","label":"EDITOR / DELETE","title":"持续可见的删除模式","note":"删除模式开启后保留明确的勾选状态，使玩家知道后续触碰对象的含义已经改变。与普通摆放模式区分，降低模式混淆。"},{"image":"assets/projects/layout/screen-11.webp","label":"BUILD / ENTRY","title":"从城建浏览衔接城市编辑","note":"城建列表保留城市编辑入口，建筑浏览和布局管理在既有城建环境中衔接，减少入口游离于城市操作之外的问题。"},{"image":"assets/projects/layout/screen-12.webp","label":"PROSPERITY / VALUE","title":"装饰对象的繁荣度价值","note":"装饰列表在单个对象上标明繁荣度及资源需求，让玩家在选择前就能比较外观与数值价值，而不是摆放后才理解收益。"},{"image":"assets/projects/layout/screen-13.webp","label":"PROSPERITY / FEEDBACK","title":"繁荣度增长的现场反馈","note":"场景中以数值提示呈现本次繁荣度变化，累计值保留在左上角。把单次编辑结果与城市成长指标关联起来。"},{"image":"assets/projects/layout/screen-14.webp","label":"PROSPERITY / MILESTONES","title":"繁荣度成就与阶段目标","note":"成就侧栏沿进度轴组织阈值与阶段内容，同时保留城建界面上下文。为自由布置补充可追踪的成长目标。"},{"image":"assets/projects/layout/screen-15.webp","label":"PROSPERITY / RULES","title":"繁荣度来源与规则说明","note":"独立说明层用图示整理繁荣度的获取来源，将规则查阅从高频编辑操作中分离。需要了解规则时再展开，不持续占用画布。"},{"image":"assets/projects/layout/screen-16.webp","label":"REFERENCE / VISIT","title":"参观他人城市与方案参考","note":"他人主城中保留完整布局与相关功能入口，为参考其他城市的摆放方式提供情境，与自己的城市编辑视角区分。"},{"image":"assets/projects/layout/screen-17.webp","label":"REFERENCE / REPLACE","title":"把参考布局替换到自己的方案","note":"替换界面以本地方案列表和预览承接参考布局，底部突出替换操作。明确目标方案后再处理替换，与直接启用布局分开表达。"}],"screenIntro":"我将方案状态、场景编辑、繁荣度反馈与他人布局参考串联起来，让模式切换和操作边界在界面中清晰可见。","tags":["TOOL UX","EDITOR"],"role":"Game UX","platform":"Mobile","stage":"已上线"},
  {"id":"racing","group":"live-ops","title":"赛车冲锋活动","product":"AGE OF APES","image":"assets/projects/racing/full-flow.webp","cover":"assets/projects/racing.jpg","banner":"assets/projects/racing.jpg","flowImage":true,"flowTitle":"赛车冲锋活动 · 完整流程与设计思路","storyTitle":"围绕冲分目标简化养成","alt":"赛车冲锋活动完整 UX 流程与设计思路","summary":"以养成更强赛车、挑战更高积分为目标，简化车库与拆解概念，将招募、自动转化、置换养成和竞速串成连续体验。","overview":"我以玩家的核心目标——培养更强的赛车、挑战排行榜高分——作为活动设计的出发点。围绕这个目标，方案去掉车库和手动选择拆车的环节：招募到同品质或更低品质的车时自动转成材料；获得更高品质车时自动置换，并承接材料所能支持的养成等级。活动同时覆盖免费参与、参赛券、试用、改装、竞速、成就、历史战绩及商业化权益。我将这些参与路径与资源处理规则整合到同一活动循环中。","challenge":"策划案包含赛车获取、拆解和养成等环节。我从玩家培养更强赛车、挑战更高积分的目标出发，梳理其中可以简化的操作：将其他车辆自动转为材料，在获得更高品质赛车时自动完成置换与养成衔接，同时清楚反馈材料去向、新车等级和属性变化。","designNotes":[{"label":"","title":"玩家要的是更强的车和更高的分数","text":"其余车辆最终多用于养成当前最强车，因此我删去车库和手动拆解环节，把玩家的注意力集中到当前赛车的成长上。"},{"label":"我的取舍","title":"保留养成目标，系统自动处理中间步骤","text":"同品质及更低品质车辆自动转材料；更高品质车辆自动置换，原车材料承接新车养成，并展示置换后的属性变化。"}],"flow":[{"title":"参与 · 免费、券与试用","note":"围绕当前赛车选择参赛方式，区分试用与自有状态。"},{"title":"招募 · 获得车辆与材料","note":"招募前解释消耗，招募后按品质关系自动处理结果。"},{"title":"养成 · 升级与自动置换","note":"投入材料升级；更高品质车自动接替并承接养成。"},{"title":"竞速 · 挑战更高积分","note":"用当前赛车进入小游戏，追求更高比赛得分。"},{"title":"回看 · 成就与历史战绩","note":"以累计奖励和单场记录承接下一次参与目标。"}],"decisions":[{"title":"用一辆当前车，代替复杂车库管理","text":"招募到较低或相同品质车辆时自动转为材料，让玩家将注意力集中在当前最强车。简化的是理解与处理步骤，养成目标依然保留。"},{"title":"自动置换，也要让结果可解释","text":"更高品质车出现时，系统完成旧车拆解和新车养成衔接，减少重复升级。通过新旧车辆对照、等级与属性变化，让玩家理解自动处理带来了什么。"},{"title":"补全免费、商业化与跨期状态","text":"免费次数、参赛券和试用承担不同参与路径；礼包与权益卡明确购买及领取状态；A／S 级赛车的跨期返还先说明、后确认，保持资源处理的一致性。"}],"screens":[{"image":"assets/projects/racing/screen-01.webp","label":"PARTICIPATE / HUB","title":"围绕当前赛车组织活动入口","note":"当前赛车作为视觉中心，右侧区分可用车辆与试用选择，改装和竞速入口围绕当前车展开。主页面重点回答“用什么车、如何提升、如何参赛”。"},{"image":"assets/projects/racing/screen-03.webp","label":"PARTICIPATE / TRIAL","title":"试用赛车与自有赛车区分","note":"选择试用车辆后保留明显试用提示，并显示对应的出战操作。玩家可提前体验车辆，但我通过状态提示区分试用与已拥有，避免把体验状态误解为永久获得。"},{"image":"assets/projects/racing/screen-04.webp","label":"PARTICIPATE / TICKETS","title":"多种参赛券的选择状态","note":"活动页补充多种赛车券的选择入口，将不同消耗路径放在出发前处理。玩家确认本次参赛方式后，再进入竞速，避免在养成与比赛之间混淆资源用途。"},{"image":"assets/projects/racing/screen-05.webp","label":"ACQUIRE / RECRUIT","title":"普通与高级招募","note":"招募页面并列展示两类入口、免费机会、进度与消耗。玩家关注获得更强赛车和养成材料，招募结果直接接入当前赛车的养成链路。"},{"image":"assets/projects/racing/screen-07.webp","label":"ACQUIRE / CONVERSION","title":"招募结果中的自动转化","note":"结果页同时呈现新赛车与材料；低于或等于当前品质的赛车自动拆解为材料。玩家不必再进入车库逐辆选择和处理。"},{"image":"assets/projects/racing/screen-08.webp","label":"GROW / UPGRADE","title":"当前车的改装与属性比较","note":"车辆形象、升级前后属性、技能与材料需求集中呈现，上方里程碑表达养成阶段。玩家围绕当前车做投入判断，不必同时管理复杂车库。"},{"image":"assets/projects/racing/screen-11.webp","label":"GROW / MAX LEVEL","title":"满级状态与操作终点","note":"满级时将属性与操作区切换为明确的完成状态。告诉玩家当前养成已到终点，避免把无法继续升级误解为材料不足。"},{"image":"assets/projects/racing/screen-12.webp","label":"GROW / REWARD PREVIEW","title":"里程碑自选宝箱预览","note":"在养成里程碑附近展开宝箱内容，使阶段奖励可以就地查看。奖励信息按需出现，不持续遮住车辆和升级比较区。"},{"image":"assets/projects/racing/screen-13.webp","label":"CORE / AUTO REPLACEMENT","title":"更高品质赛车的自动置换","note":"这是方案简化的关键：获得更高品质赛车后，系统自动替换当前车，并把原车拆解所得材料用于新车养成，升至材料可支持的等级。用新旧车和属性对照解释结果。"},{"image":"assets/projects/racing/screen-14.webp","label":"CORE / GROWTH FEEDBACK","title":"置换升级后的反馈","note":"置换后回到熟悉的改装界面，通过车辆、属性与升级反馈确认变化。让自动完成的处理仍然可被看见，避免省略操作的同时也省略结果解释。"},{"image":"assets/projects/racing/screen-15.webp","label":"GROW / SKILL","title":"技能说明的就地展开","note":"技能气泡在车辆附近展示效果与成长信息。主页面保留简洁浏览，需要比较技能时再展开，避免把完整规则长期堆在车辆周围。"},{"image":"assets/projects/racing/screen-26.webp","label":"RACE / PLAY","title":"竞速中的时间、得分与操作","note":"顶部显示剩余时间、得分与速度，左右两侧承载方向和技能操作，中央保留赛道。养成后的车辆在实际竞速中承接冲分目标。"},{"image":"assets/projects/racing/screen-17.webp","label":"RETURN / ACHIEVEMENT","title":"累计积分成就","note":"成就按累计积分阈值组织奖励和进度，接住单场竞速之后的持续目标。玩家既能追求本场成绩，也能看到多次参与带来的阶段收益。"},{"image":"assets/projects/racing/screen-19.webp","label":"RETURN / RECORD","title":"可展开的历史战绩","note":"战绩条目先展示积分与出战车辆，再展开单场数据。把每次比赛结果与当时使用的车辆关联，便于回看，而不在列表默认态堆叠全部细节。"},{"image":"assets/projects/racing/screen-20.webp","label":"OFFER / SPECIAL","title":"竞速特惠与资源补给","note":"特惠页集中呈现礼包内容、价格与限购信息，使用独立的商业化页面承接补给。与招募、改装区分，使购买与核心玩法操作的意图清楚。"},{"image":"assets/projects/racing/screen-21.webp","label":"OFFER / ENTITLEMENT","title":"极速金卡的购买前说明","note":"购买前同时展示即时权益和每日免费领取内容，明确它与一次性礼包的区别。让玩家在购买前理解后续领取安排。"},{"image":"assets/projects/racing/screen-22.webp","label":"OFFER / CLAIM","title":"购买后的每日领取","note":"购买后沿用权益卡布局，将主要按钮切换为领取奖励。对同一个商品区分购买和领取两种操作，避免权益获得后入口含义模糊。"},{"image":"assets/projects/racing/screen-23.webp","label":"OFFER / CLAIMED","title":"已领取与下一次领取时间","note":"领取后显示已领取标记与下次领取倒计时，形成购买前、可领取、已领取的完整状态闭环。状态变化代替重复操作提示。"},{"image":"assets/projects/racing/screen-25.webp","label":"CYCLE / CARRYOVER","title":"新一期活动的材料返还","note":"A／S 级赛车可在下期活动返还养成材料，提示先出现在改装区，新活动开启后再用返还界面确认。让跨期处理的原因、预期与结果对应。"}],"screenIntro":"我通过自动转化与置换缩短养成路径，并用改装反馈、竞速战绩和完整的购买／领取状态，让投入、成长与结果相互对应。","tags":["LIVE OPS","PROGRESSION UX"],"role":"Game UX / UI","platform":"Mobile","stage":"已上线"},
  { id: "festival", group: "live-ops", title: "科技节", product: "AGE OF APES", image: "assets/projects/tech-festival.jpg", video: "assets/videos/tech-festival.mp4", alt: "科技节遗迹探寻活动界面", summary: "用奖励预览、扫描动画和资源补救构建有期待感的遗迹探寻节奏。", overview: "玩家消耗铲子启动全息扫描，从一组隐藏奖励中完成探测并逐层推进。方案把抽取前的价值判断、抽取中的期待和资源不足后的恢复路径连接起来。", challenge: "随机奖励需要制造悬念，但不能牺牲规则透明度。界面必须让玩家在操作前知道可能获得什么，在操作后清楚理解结果与下一步。", flow: ["查看当前层与铲子数量", "预览本层奖励", "启动扫描并完成洗牌", "揭示奖励与层级进度", "进入下一层或补充铲子"], decisions: [
    { title: "随机之前先给确定信息", text: "大奖预览、当前层数和消耗常驻，玩家可以在开始扫描前评估投入。" },
    { title: "动效承担过程反馈", text: "扫描与洗牌动画强化科技主题，同时通过明确的开始、进行中、完成三态防止重复操作。" },
    { title: "资源不足仍提供下一步", text: "铲子不足时不只禁用按钮，而是展示获取路径，把中断转化为可恢复任务。" }
  ], screens: [
    { image: "assets/projects/cases/festival-01.webp", label: "READY", title: "可探索状态", note: "当前层、铲子数量和主操作形成单一焦点，玩家进入页面即可判断是否能开始。" },
    { image: "assets/projects/cases/festival-02.webp", label: "PREVIEW", title: "探索前奖励预览", note: "奖励池在消耗前可查看，保留随机性的同时建立公平感与目标感。" },
    { image: "assets/projects/cases/festival-03.webp", label: "SCAN", title: "扫描与洗牌过程", note: "锁定输入并用全息扫描表现系统正在处理，等待时间被转化为活动氛围。" },
    { image: "assets/projects/cases/festival-04.webp", label: "MILESTONE", title: "每层大奖", note: "逐层展示关键奖励，让单次探索有短反馈，连续参与有长期目标。" },
    { image: "assets/projects/cases/festival-05.webp", label: "RECOVERY", title: "铲子不足状态", note: "主按钮切换为获取入口，并保留奖励信息，玩家无需离开上下文寻找资源。" }
  ], screenIntro: "五个状态共同完成一次“判断价值—投入资源—等待结果—继续推进”的抽奖体验。", tags: ["MOTION", "FEEDBACK"], role: "Game UX / Motion", platform: "Mobile", stage: "已上线" },
  { id: "seven-day", group: "live-ops", title: "7日活动优化", product: "AGE OF APES", image: "assets/projects/seven-day.jpg", cover: "assets/projects/seven-day-cover.webp", banner: "assets/projects/seven-day-banner.webp", alt: "七日活动优化方案", summary: "重新组织七日任务、奖励节点和 VIP 价值提示，让进度与收益更容易理解。", overview: "这是对存量七日活动的结构优化。玩家按天完成任务并领取阶段奖励，同时在关键节点获得 VIP 道具。方案把零散邮件奖励改为活动内可见、可预期的成长路径。", challenge: "旧方案的奖励价值分散，玩家难以理解完成任务与 VIP 成长之间的关系。我在不增加页面复杂度的前提下，强化任务目标与奖励兑现的联系。", flow: ["进入活动查看当日任务", "完成任务积累进度", "领取任务与阶段奖励", "触发 VIP 道具说明", "前往 VIP 系统完成解锁"], decisions: [
    { title: "进度和奖励同屏对应", text: "顶部里程碑与下方任务卡形成清楚映射，玩家能同时看到当前进度、下一奖励和可执行任务。" },
    { title: "高价值奖励获得单独反馈", text: "VIP 道具使用气泡和奖励弹窗强调，避免与普通资源一起被快速忽略。" },
    { title: "未解锁时给出完整闭环", text: "奖励预览说明用途，并提供前往 VIP 页的明确入口，让奖励获得后立即有下一步。" }
  ], screens: [
    { image: "assets/projects/cases/seven-day-01.webp", label: "TASK", title: "七日任务与阶段进度", note: "日期、任务卡和顶部奖励节点形成纵横两条层级，信息多但浏览顺序稳定。" },
    { image: "assets/projects/cases/seven-day-02.webp", label: "MILESTONE", title: "里程碑奖励状态", note: "已领取、可领取与未达成使用明显差异，降低反复检查的成本。" },
    { image: "assets/projects/cases/seven-day-03.webp", label: "VIP REWARD", title: "VIP 道具提示", note: "在活动页就解释特殊道具的价值与状态，让奖励不再依赖邮件文本理解。" },
    { image: "assets/projects/cases/seven-day-04.webp", label: "NEXT STEP", title: "奖励获得与前往解锁", note: "获得反馈同时提供使用入口，把活动奖励自然连接到 VIP 成长系统。" }
  ], screenIntro: "我将任务进度、奖励节点与 VIP 道具用途关联，让玩家从完成任务到使用奖励都有明确目标。", tags: ["LIVE OPS", "OPTIMIZATION"], role: "Game UX", platform: "Mobile", stage: "已上线" },
  { id: "mecha", group: "live-ops", title: "机甲转盘", product: "AGE OF APES", image: "assets/projects/mecha-wheel.jpg", video: "assets/videos/mecha-wheel.mp4", alt: "机甲转盘活动主界面", summary: "通过奖池可见、抽取动效与累计计数，建立简洁而有张力的转盘反馈。", overview: "玩家消耗活动资源进行单抽或多抽，转盘在旋转中依次揭示结果，多抽时持续累计本轮奖励。设计把奖品浏览、消耗确认和结果反馈压缩在同一主场景。", challenge: "转盘流程很短，体验价值主要来自动效节奏与结果可读性。我控制辅助信息的视觉权重，让焦点始终落在转盘、当前奖品和累计结果上。", flow: ["查看奖池与剩余资源", "选择单抽或多抽", "转盘加速并锁定奖格", "展示本次奖励", "多抽累计并完成结算"], decisions: [
    { title: "一个场景完成主要操作", text: "奖池、消耗与抽取按钮围绕转盘布局，避免抽取前后频繁跳页。" },
    { title: "动画分段建立期待", text: "加速、匀速、减速和停靠形成清楚节奏，停靠位置与结果反馈保持视觉连续。" },
    { title: "多抽过程随时可读", text: "累计数量贴近当前奖励呈现，让连续动画中每一次获得都可被理解。" }
  ], screens: [
    { image: "assets/projects/cases/mecha-01.webp", label: "READY", title: "活动主界面", note: "转盘是唯一视觉中心，奖池、资源和抽取方式在外围保持清楚但不过度抢占注意力。" },
    { image: "assets/projects/cases/mecha-02.webp", label: "SPIN", title: "抽取中状态", note: "非必要操作暂时弱化，光效和指针共同指向当前过程，避免玩家误触与结果不确定。" },
    { image: "assets/projects/cases/mecha-03.webp", label: "MULTI DRAW", title: "多抽累计反馈", note: "连续抽取时显示当前累计奖励个数，让过程有进展感，也方便玩家确认所得。" }
  ], screenIntro: "我以可操作、抽取中和结果累计三种状态组织反馈，让每次抽取的过程与所得都清楚可读。", tags: ["REWARD", "MOTION"], role: "Game UX", platform: "Mobile", stage: "已上线" },
  {"id":"christmas-match","group":"live-ops","title":"圣诞节对对碰","product":"AGE OF APES","image":"assets/projects/christmas-match/full-flow.jpg","cover":"assets/projects/christmas-match/cover.webp","banner":"assets/projects/christmas-match/cover.webp","video":"assets/projects/christmas-match/demo.mp4","flowImage":true,"flowTitle":"圣诞节对对碰 · 完整活动流程","storyTitle":"把奖励规则转化为可理解的参与过程","alt":"圣诞节对对碰活动完整流程：规则引导、礼物选择、开奖、结算与排行","summary":"围绕圣诞礼物的开启与消除，串联礼物方案、幸运礼物、额外礼物反馈和奖励结算，让一次抽奖形成连续的参与体验。","overview":"活动以礼物对对碰为核心：玩家先选择初始礼物数量与幸运礼物，再进入开启与消除过程。抽中幸运礼物、对碰、三连及清台都可能带来额外礼物。我将准备、进行中、结算和后续参与组织为连续流程，并配合规则图解、任务、积分与补充机会，帮助玩家理解每一步的选择和结果。","challenge":"玩法同时包含礼物数量、幸运礼物和多种追加礼物条件。如果全部依靠文字解释，玩家很难将规则与过程对应。设计需要在开始前分步交代选择，在进行中说明为什么获得额外礼物，并在结束后分别呈现奖励与积分表现。","designNotes":[{"label":"INFORMATION / 分步理解","title":"先说明三步，再进入选择","text":"首次引导按“选择礼物方案—选择幸运礼物—获取更多礼物”建立整体预期。准备过程再拆成独立弹窗，避免初次进入时同时处理规则、奖池与消耗。"},{"label":"FEEDBACK / 规则可见","title":"把触发原因和追加结果放在一起","text":"进行中保留幸运礼物标识，消除区域突出当前触发的组合，并显示追加礼物数量；剩余礼物与已收集奖励各有固定位置，让过程、余量和所得能够同时被确认。"}],"flow":[{"title":"理解玩法","note":"首次图解引导，读完后领取抽奖券。"},{"title":"选择方案","note":"确认初始礼物数量，再选幸运礼物。"},{"title":"开启与消除","note":"关注触发组合、追加礼物和剩余数量。"},{"title":"确认结果","note":"奖励汇总后展示本轮表现与排行。"},{"title":"再次参与","note":"通过任务、积分奖励与补充方案衔接下一轮。"}],"decisions":[{"title":"将两次选择拆开确认","text":"礼物数量决定本轮的初始投入，幸运礼物决定玩家关注的目标。用两步选择区分这两个问题，并通过选中框与确认按钮给出明确的完成状态。"},{"title":"用局部反馈解释奖励变化","text":"幸运礼物标识、组合高亮与追加礼物提示围绕棋盘展开，右侧累计奖励、下方剩余礼物分别承接结果和进度。玩家能将规则触发与数量变化联系起来。"},{"title":"把结束与继续参与区分开","text":"先汇总实际获得的奖励，再展示本轮表现与排行；礼物耗尽时单独给出补充方案，任务和积分奖励作为后续入口，避免把结算、排名与再次投入混在一个界面里。"}],"screens":[{"image":"assets/projects/christmas-match/screen-01.webp","label":"ONBOARDING / OVERVIEW","title":"用三步图解建立玩法预期","note":"首次进入以礼物方案、幸运礼物和额外礼物三个视觉节点说明流程。先让玩家知道接下来做什么，再进入具体选择。"},{"image":"assets/projects/christmas-match/guide-reward.webp","label":"ONBOARDING / REWARD","title":"引导结束后承接首次参与","note":"读完规则后以独立奖励弹窗发放抽奖券，将规则介绍衔接到可参与状态。奖励确认后回到活动主界面。"},{"image":"assets/projects/christmas-match/screen-02.webp","label":"READY / HUB","title":"准备界面区分操作与进度","note":"中央礼物区与主按钮承担本轮操作，上方展示奖励信息，侧边保留积分、任务与规则入口。开始前先形成明确的操作焦点。"},{"image":"assets/projects/christmas-match/screen-03.webp","label":"SETUP / QUANTITY","title":"先选择初始礼物数量","note":"三个方案并列展示礼物数量，选中框和底部按钮明确当前选择。将初始投入的确认从开奖过程里独立出来。"},{"image":"assets/projects/christmas-match/screen-04.webp","label":"SETUP / LUCKY GIFT","title":"再选择本轮关注的幸运礼物","note":"以道具网格承载候选礼物，通过统一选中框与确认按钮完成第二次选择。后续进行中继续显示所选礼物，保留选择上下文。"},{"image":"assets/projects/christmas-match/screen-05.webp","label":"PLAY / MATCH FEEDBACK","title":"触发组合与额外礼物同步反馈","note":"组合高亮和追加礼物提示贴近发生位置，顶部保留幸运礼物，右侧累计所得、下方显示剩余礼物。让当前触发、已有奖励和剩余过程分别可读，并提供跳过入口。"},{"image":"assets/projects/christmas-match/screen-08.webp","label":"HELP / RULE EXAMPLES","title":"用四类图例解释追加条件","note":"规则页将幸运礼物、对碰、三连与清台分别示意，并在对应位置标出追加礼物数量。帮助玩家把抽象规则对应到棋盘上的实际情况。"},{"image":"assets/projects/christmas-match/screen-06.webp","label":"RESULT / REWARDS","title":"结束后集中确认实际所得","note":"奖励弹窗按道具汇总本轮收获，将进行中的连续反馈收束为清楚的结果，便于确认获得了什么。"},{"image":"assets/projects/christmas-match/screen-07.webp","label":"RESULT / RANKING","title":"奖励之外单独呈现本轮表现","note":"将本轮记录、新纪录提示和排行放在结果界面，区分物品收获与竞争表现，为下一轮参与提供可比较的目标。"},{"image":"assets/projects/christmas-match/screen-09.webp","label":"RETURN / TASKS","title":"任务进度衔接后续参与","note":"每日与成就任务通过页签区分，逐行呈现条件、进度与领取状态，下方累计进度奖励提供阶段目标。"},{"image":"assets/projects/christmas-match/screen-10.webp","label":"PROGRESS / EXPANDED","title":"积分奖励展开后保留主操作","note":"展开的积分奖励集中在棋盘右侧，已达成状态与下一档奖励在同一区域呈现，中央礼物区与底部操作保持稳定。"},{"image":"assets/projects/christmas-match/screen-11.webp","label":"CONTINUE / REFILL","title":"礼物耗尽时提供补充选择","note":"补充弹窗区分广告方案与券消耗方案，展示补充数量和免费次数信息。让玩家在继续之前确认本次补充的方式与条件。"}],"screenIntro":"按准备、选择、进行中、结果和再次参与拆解关键界面，重点呈现奖励规则如何通过操作与反馈被逐步理解。","tags":["LIVE OPS","REWARD UX"],"role":"Game UX","platform":"Mobile","stage":"设计方案与演示"},
  {"id":"privilege-card","group":"live-ops","title":"特权卡","product":"AGE OF APES","image":"assets/projects/privilege/full-flow.webp","cover":"assets/projects/privilege-card.webp","banner":"assets/projects/privilege-card.webp","flowImage":true,"flowTitle":"特权卡 · 场景触达与权益使用流程","storyTitle":"让特权在场景里被发现、被使用","alt":"特权卡完整流程：摩托车、吸铁石、额外劳工的场景触达与权益反馈","summary":"围绕摩托车、吸铁石和额外劳工，将购买前的场景触达、权益介绍与购买后的使用反馈连接起来。","overview":"特权卡包含摩托车、吸铁石和额外劳工三项权益。我将未购买时的道具触点放进主城场景，通过角色靠近或场景交互承接礼包提示与特权卡界面。购买后，吸铁石以人物头顶的可用提示、全屏资源收集和结果汇总表达使用过程；摩托车则通过实际骑乘呈现权益，让购买前的承诺在场景里得到对应。","challenge":"我区分三类信息：未购买时在哪里发现权益、进入特权卡界面后如何理解价值、购买后如何感知实际效果。场景道具、人物头顶状态和全屏收集各自承担明确职责，避免把入口、可用提示与结果反馈混在一起。","flow":[{"title":"场景触达 · 三项权益","note":"摩托车、吸铁石和额外劳工分别出现在与使用相关的主城情境中。"},{"title":"权益介绍 · 购买确认","note":"场景提示与弹窗指向同一套特权内容，集中说明道具和价格。"},{"title":"使用反馈 · 状态与结果","note":"吸铁石串联可用、全屏效果、结果与冷却；摩托车呈现实际骑乘。"}],"decisions":[{"title":"道具负责触达，人物头顶提示负责状态","text":"未购买时，摩托车与额外劳工以场景道具出现，吸铁石也在角色位置建立触点。购买后，人物头顶的发光图标明确表达吸铁石可用，避免将它误读为普通 HUD 导航。"},{"title":"用连续反馈说明一键收取做了什么","text":"吸铁石可用提示引导使用，全屏资源汇聚表现多个资源点被集中处理，结果弹窗再汇总具体数量，冷却期间收起可用提示。过程、结果与下一次可用状态清楚分开。"},{"title":"把购买前后的表现对应起来","text":"购买前展示三项道具触点，进入统一权益介绍；购买后通过骑乘、资源收集等实际表现承接特权价值，让场景里的提示与真实使用体验相互对应。"}],"screens":[{"image":"assets/projects/privilege/screen-01.webp","label":"OVERVIEW / BENEFITS","title":"特权卡权益与付费入口","note":"购买页将摩托车、吸铁石和额外劳工三项权益并列呈现，并在同一层级说明内容与价格。我用具体道具和使用收益帮助玩家理解特权，而不是只展示抽象权益名称。"},{"image":"assets/projects/privilege/screen-07.webp","label":"BEFORE PURCHASE / MOTORCYCLE","title":"摩托车道具的场景触达","note":"未购买时，摩托车以场景气泡道具的形式出现。玩家靠近可触发特权卡界面，使移动相关权益在主城行动中被发现，与吸铁石状态或冷却提示区分。"},{"image":"assets/projects/privilege/screen-10.webp","label":"BEFORE PURCHASE / WORKER","title":"额外劳工的场景表现","note":"未购买时，额外劳工以独立的场景气泡呈现，作为这项权益的触点。我将劳工权益放回城市生产情境，让玩家在日常行动中接触到它。"},{"image":"assets/projects/privilege/screen-03.webp","label":"BEFORE PURCHASE / MAGNET","title":"未购买时的吸铁石触点","note":"吸铁石图标出现在人物头顶，作为一键收取权益的场景触点。它与摩托车、额外劳工共同承接特权卡购买入口，但不是固定在 HUD 边缘的常驻按钮。"},{"image":"assets/projects/privilege/screen-09.webp","label":"BEFORE PURCHASE / OFFER","title":"三项场景触点的礼包提示","note":"摩托车、吸铁石和额外劳工使用共同的礼包触发提示，展示特权卡内容与价格，并衔接权益界面。我统一触达结构，让不同道具指向同一套权益说明。"},{"image":"assets/projects/privilege/screen-08.webp","label":"PURCHASE / DIALOG","title":"保留主城上下文的特权卡弹窗","note":"从场景触点进入后，用弹窗完整呈现三项权益与价格，保留背后的城市环境。场景展示先建立使用情境，弹窗再承担购买前的信息确认。"},{"image":"assets/projects/privilege/screen-02.webp","label":"AFTER PURCHASE / AVAILABLE","title":"人物头顶的吸铁石可用提示","note":"吸铁石可用时，在人物头顶显示发光状态提示，跟随角色所在位置。这个提示表达当前可以使用吸铁石，而不是泛指特权卡入口。"},{"image":"assets/projects/privilege/screen-04.webp","label":"AFTER PURCHASE / EFFECT","title":"吸铁石使用后的全屏收集效果","note":"使用吸铁石后，资源从场景各处集中飞向角色，形成全屏收集反馈。我通过资源汇聚的方向和覆盖范围，让一键处理多个资源点的效果被直接看见。"},{"image":"assets/projects/privilege/screen-11.webp","label":"AFTER PURCHASE / RESULT","title":"资源快速收集结果","note":"全屏效果结束后，结果弹窗按资源类型汇总本次获得的数量。先表现收集过程，再明确结算结果，让效率体验与实际收益对应。"},{"image":"assets/projects/privilege/screen-05.webp","label":"AFTER PURCHASE / COOLDOWN","title":"吸铁石冷却中的场景状态","note":"进入冷却后，角色头顶不再保持可点击时的发光提示。可用与冷却状态通过提示的出现和收起区分，避免玩家把暂时不可用误认为仍可触发。"},{"image":"assets/projects/privilege/screen-06.webp","label":"AFTER PURCHASE / RIDING","title":"摩托车使用后的骑行表现","note":"获得权益后，通过角色骑乘摩托车的场景表现呈现使用结果。将购买前的道具触点与购买后的实际骑乘区分，移动权益在操作过程中持续可见。"}],"screenIntro":"我将三项权益的场景触达分别呈现，并完整表达吸铁石从可用提示、全屏收集到结果与冷却的状态变化。","tags":["MONETIZATION","SCENE UX"],"role":"Game UX","platform":"Mobile","stage":"已上线"},
];

const groupRoot = document.querySelector("#work-groups");
const dialog = document.querySelector("#case-dialog");
const caseJumpWrap = dialog.querySelector(".case-jump-wrap");
const caseJumpButton = dialog.querySelector("#case-jump-button");
const caseJumpValue = dialog.querySelector("#case-jump-value");
const caseJumpMenu = dialog.querySelector("#case-jump-menu");
const overviewMedia = dialog.querySelector(".case-overview-media");
const keyScreens = dialog.querySelector(".key-screen-list");
const defaultKeyScreens = keyScreens.innerHTML;
const keyScreensIntro = dialog.querySelector(".case-key-head > p:not(.eyebrow)");
const defaultKeyIntro = keyScreensIntro.textContent;
const caseChallenge = dialog.querySelector("#case-challenge");
const caseFlow = dialog.querySelector("#case-flow");
const caseDecisions = dialog.querySelector("#case-decisions");
const comparisonViewer = document.querySelector("#comparison-viewer");
const comparisonStage = comparisonViewer.querySelector(".comparison-viewer-stage");
const comparisonImage = comparisonViewer.querySelector(".comparison-viewer-stage img");
const comparisonZoomButton = comparisonViewer.querySelector("[data-image-zoom]");
let activeComparison = null;
let activeProjectIndex = 0;
let imageZoom = 1;
let imagePanX = 0;
let imagePanY = 0;
let imageDrag = null;
let imageBlankPress = null;
let imageZoomControls;

function applyImageTransform() {
  const maxX=Math.max(0,(comparisonImage.offsetWidth*imageZoom-comparisonStage.clientWidth)/2);
  const maxY=Math.max(0,(comparisonImage.offsetHeight*imageZoom-comparisonStage.clientHeight)/2);
  imagePanX=Math.max(-maxX,Math.min(maxX,imagePanX));imagePanY=Math.max(-maxY,Math.min(maxY,imagePanY));
  comparisonImage.style.transform = `translate3d(${imagePanX}px, ${imagePanY}px, 0) scale(${imageZoom})`;
  comparisonViewer.classList.toggle("is-zoomed", imageZoom > 1.01);
  comparisonZoomButton.setAttribute("aria-pressed", String(imageZoom > 1.01));
  imageZoomControls?.update(imageZoom);
}

function setImageZoom(nextZoom, originX = 0, originY = 0) {
  const previous = imageZoom;
  imageZoom = Math.min(10, Math.max(1, nextZoom));
  if (imageZoom === 1) {
    imagePanX = 0;
    imagePanY = 0;
  } else {
    const ratio = imageZoom / previous;
    imagePanX = originX - (originX - imagePanX) * ratio;
    imagePanY = originY - (originY - imagePanY) * ratio;
  }
  applyImageTransform();
}

function resetImageZoom() {
  imageZoom = 1;
  imagePanX = 0;
  imagePanY = 0;
  imageDrag = null;
  comparisonStage.classList.remove("is-dragging");
  applyImageTransform();
}

function renderComparisons(project) {
  const hasComparisons = Boolean(project.comparisons?.length);
  dialog.querySelector("#key-screens-title").textContent = hasComparisons ? "界面优化前后对比" : "关键界面拆解";
  keyScreensIntro.textContent = hasComparisons ? "我围绕主界面、集结与宝箱重构展示空间和操作层级，让核心系统的视觉分量与使用体验一起提升。" : defaultKeyIntro;
  keyScreens.innerHTML = hasComparisons ? project.comparisons.map((pair, index) => `
    <article class="comparison-pair">
      <header class="comparison-pair-head"><span>${String(index + 1).padStart(2, "0")} / UI REDESIGN</span><h4>${pair.title}</h4></header>
      <div class="comparison-columns">
        ${["before", "after"].map(side => `<button class="comparison-image comparison-image--${side} interactive" type="button" data-comparison="${index}" data-side="${side}" aria-label="放大${pair.title}${side === "before" ? "优化前" : "优化后"}">
          <span class="comparison-label"><b>${side === "before" ? "BEFORE" : "AFTER"}</b><span>${side === "before" ? "优化前" : "优化后"}</span><i aria-hidden="true">＋</i></span>
          <span class="comparison-frame"><img src="${pair[side]}" alt="${pair.title} · ${side === "before" ? "优化前" : "优化后"}" loading="lazy"></span>
        </button>`).join("")}
      </div>
      <p class="comparison-note">${pair.note}</p>
    </article>`).join("") : defaultKeyScreens;
  overviewMedia.setAttribute("aria-label", hasComparisons ? "放大查看优化后主界面" : "放大查看项目概览图");
  overviewMedia.querySelector("span").textContent = hasComparisons ? "AFTER / CLICK TO VIEW" : "FULL FLOW / CLICK TO VIEW";
  if (project.screens?.length) {
    dialog.querySelector("#key-screens-title").textContent = "界面与状态反馈";
    keyScreensIntro.textContent = project.screenIntro || "逐一拆解关键界面的信息、操作与反馈。";
    const gridClass = project.id === "shelter-check" ? "shelter-screen-grid" : "case-screen-grid";
    const cardClass = project.id === "shelter-check" ? "shelter-screen-card" : "case-screen-card";
    const imageClass = project.id === "shelter-check" ? "shelter-screen-image" : "case-screen-image";
    const copyClass = project.id === "shelter-check" ? "shelter-screen-copy" : "case-screen-copy";
    keyScreens.innerHTML = `<div class="${gridClass}">${project.screens.map((screen, index) => `
      <article class="${cardClass}">
        <button class="${imageClass} interactive" type="button" data-case-image="${index}" aria-label="放大查看${screen.title}">
          <img src="${screen.image}" alt="${screen.title}" loading="lazy"><span>＋</span>
        </button>
        <div class="${copyClass}"><span>${String(index + 1).padStart(2, "0")} / ${screen.label}</span><h4>${screen.title}</h4><p>${screen.note}</p></div>
      </article>`).join("")}</div>`;
  }
}

function openCaseImage(src, title) {
  comparisonViewer.dataset.mode = "single";
  comparisonViewer.querySelector("[data-compare-close]").textContent = "← 返回项目";
  comparisonViewer.querySelector(".comparison-side-switch").hidden = true;
  comparisonZoomButton.hidden = false;
  comparisonViewer.querySelector("h3").textContent = title;
  comparisonImage.src = src;
  comparisonImage.alt = title;
  resetImageZoom();
  comparisonViewer.showModal();
}

function showComparisonSide(side) {
  comparisonViewer.dataset.mode = "compare";
  comparisonViewer.querySelector("[data-compare-close]").textContent = "← 返回对比";
  comparisonViewer.querySelector(".comparison-side-switch").hidden = false;
  comparisonZoomButton.hidden = false;
  comparisonImage.src = activeComparison[side];
  comparisonImage.alt = `${activeComparison.title} · ${side === "before" ? "优化前" : "优化后"}`;
  comparisonViewer.querySelector("h3").textContent = activeComparison.title;
  comparisonViewer.querySelectorAll("[data-compare-side]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.compareSide === side));
  });
  resetImageZoom();
}

keyScreens.addEventListener("click", event => {
  const singleImage = event.target.closest("[data-case-image]");
  if (singleImage) {
    const screen = projects[activeProjectIndex].screens[Number(singleImage.dataset.caseImage)];
    openCaseImage(screen.image, screen.title);
    return;
  }
  const button = event.target.closest("[data-comparison]");
  if (!button) return;
  activeComparison = projects[activeProjectIndex].comparisons[Number(button.dataset.comparison)];
  showComparisonSide(button.dataset.side);
  comparisonViewer.showModal();
});
comparisonViewer.addEventListener("click", event => {
  if (event.target.closest("[data-compare-close]")) comparisonViewer.close();
  const zoom = event.target.closest("[data-image-zoom]");
  if (zoom) setImageZoom(1);
  const button = event.target.closest("[data-compare-side]");
  if (button) showComparisonSide(button.dataset.compareSide);
});
comparisonStage.addEventListener("wheel", event => {
  event.preventDefault();
  const bounds = comparisonStage.getBoundingClientRect();
  const originX = event.clientX - bounds.left - bounds.width / 2;
  const originY = event.clientY - bounds.top - bounds.height / 2;
  setImageZoom(imageZoom * Math.exp(-event.deltaY * .0015), originX, originY);
}, { passive: false });
comparisonStage.addEventListener("dblclick", event => {
  const bounds = comparisonStage.getBoundingClientRect();
  setImageZoom(imageZoom > 1.01 ? 1 : 2, event.clientX - bounds.left - bounds.width / 2, event.clientY - bounds.top - bounds.height / 2);
});
comparisonStage.addEventListener("pointerdown", event => {
  const bounds = comparisonImage.getBoundingClientRect();
  imageBlankPress = event.button === 0 && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
    ? { x: event.clientX, y: event.clientY } : null;
  if (imageZoom <= 1.01 || event.button !== 0) return;
  imageDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, panX: imagePanX, panY: imagePanY };
  comparisonStage.setPointerCapture(event.pointerId);
  comparisonStage.classList.add("is-dragging");
});
comparisonStage.addEventListener("click", event => {
  if (!imageBlankPress) return;
  const press = imageBlankPress;
  imageBlankPress = null;
  const bounds = comparisonImage.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside && Math.hypot(event.clientX - press.x, event.clientY - press.y) < 5) comparisonViewer.close();
});
comparisonStage.addEventListener("pointermove", event => {
  if (!imageDrag || imageDrag.id !== event.pointerId) return;
  imagePanX = imageDrag.panX + event.clientX - imageDrag.x;
  imagePanY = imageDrag.panY + event.clientY - imageDrag.y;
  applyImageTransform();
});
function finishImageDrag(event) {
  if (!imageDrag || imageDrag.id !== event.pointerId) return;
  imageDrag = null;
  comparisonStage.classList.remove("is-dragging");
  if (comparisonStage.hasPointerCapture(event.pointerId)) comparisonStage.releasePointerCapture(event.pointerId);
}
comparisonStage.addEventListener("pointerup", finishImageDrag);
comparisonStage.addEventListener("pointercancel", finishImageDrag);
window.PortfolioImageGestures.touch({viewer:comparisonViewer,stage:comparisonStage,
  getState:()=>({zoom:imageZoom,panX:imagePanX,panY:imagePanY}),
  setState:state=>{imageZoom=state.zoom;imagePanX=state.zoom===1?0:state.panX;imagePanY=state.zoom===1?0:state.panY;imageBlankPress=null;imageDrag=null;applyImageTransform();}});
imageZoomControls=window.PortfolioImageGestures.controls(comparisonZoomButton,{getZoom:()=>imageZoom,setZoom:setImageZoom});
comparisonViewer.addEventListener("close", resetImageZoom);
comparisonViewer.addEventListener("keydown", event => {
  if (imageZoom > 1.01) return;
  if (comparisonViewer.dataset.mode !== "compare") return;
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  showComparisonSide(event.key === "ArrowLeft" ? "before" : "after");
});

function projectCard(project) {
  const title = window.PortfolioCovers?.title(project) || project.title;
  const product = project.product === 'AGE OF APES' ? '猿族时代 / Age of Apes' : project.product;
  return `
    <article class="project-card reveal">
      <button class="project-button interactive" type="button" data-project="${project.id}" aria-label="查看 ${project.title}">
        <div class="project-media">
          ${window.PortfolioCovers?.render(project) || `<img src="${project.cover || project.image}" alt="${project.alt}" loading="lazy">`}
          ${project.video ? '<span class="project-video-label" aria-hidden="true">▶ 实录</span>' : ""}
          <span class="project-open" aria-hidden="true">查看项目 <span>↗</span></span>
        </div>
        <div class="project-meta">
          <div class="project-title-row"><h4><span class="project-title-clip"><span class="project-title-text">${title}</span><span class="project-title-echo" aria-hidden="true">${title}</span></span></h4><span class="project-title-arrow" aria-hidden="true">↗</span></div>
          <div class="project-context"><p class="project-product">${product}</p></div>
        </div>
      </button>
    </article>`;
}

function workGroup(group) {
  const items = projects.filter((project) => project.group === group.kind);
  return `
    <section class="work-group" id="${group.id}">
      <div class="group-head reveal"><h3>${group.title}</h3><b>${group.label}</b></div>
      <div class="project-grid">${items.map(projectCard).join("")}</div>
    </section>`;
}

groupRoot.innerHTML = `${groups.map(workGroup).join("")}
  <section class="work-group" id="ui-craft">
    <div class="group-head reveal"><h3>界面与视觉</h3><b>UI GALLERY</b></div>
    <div class="gallery-toolbar">
      <div class="gallery-filters" role="group" aria-label="界面分类"></div>
    </div>
    <div class="gallery-grid" id="gallery-grid"></div>
    <button class="gallery-expand interactive" type="button" aria-expanded="false" aria-controls="gallery-grid"></button>
  </section>`;

caseJumpMenu.innerHTML = projects
  .map((project) => `
    <button class="case-jump-option interactive" type="button" role="option" data-jump-project="${project.id}" aria-selected="false">
      <strong>${project.title}</strong><i aria-hidden="true">↗</i>
    </button>`)
  .join("");

function setCaseMenu(open) {
  caseJumpMenu.hidden = !open;
  caseJumpButton.setAttribute("aria-expanded", String(open));
  caseJumpWrap.classList.toggle("is-open", open);
}

let caseRevision=0;
let caseObservers=[];
const caseRoute=window.DialogRoute('project',id=>{const p=projects.find(p=>p.id===id);if(p)openProject(p);},()=>closeProject(true));
function releaseCaseMedia(){window.CaseVideo?.clear(dialog.querySelector("#case-video"));caseObservers.forEach(o=>o.disconnect());caseObservers=[];window.CaseEntrance?.clear(dialog);}
function closeProject(fromHistory=false){
  ++caseRevision;releaseCaseMedia();
  if(!fromHistory){caseRoute.close();return;}
  window.SurfaceMotion.close(dialog,dialog.querySelector('.case-banner-art'));
}
function caseBanner(project,source){
  const banner=dialog.querySelector('.case-banner');
  let art=banner.querySelector('.case-banner-art');if(!art){art=document.createElement('div');art.className='case-banner-art';banner.prepend(art);}
  const cached=source?.querySelector('img');
  art.innerHTML=`<img src="${cached?.currentSrc||`assets/project-thumbs/${project.id}-960.webp`}" alt="${project.title}项目画面" decoding="async">`;
  const old=dialog.querySelector('#case-banner-image');old.hidden=true;old.removeAttribute('src');
  return art;
}
async function openProject(project, source) {
  if(window.SurfaceMotion.closing||caseRoute.closing)return;
  const ticket=++caseRevision;releaseCaseMedia();
  const done=window.PortfolioQuality.begin('project-response');
  activeProjectIndex=projects.findIndex(p=>p.id===project.id);
  dialog.querySelector('#case-title').textContent=project.title;
  dialog.querySelector('#case-summary').textContent=project.summary;
  dialog.querySelector('#case-index').textContent=project.product;
  dialog.querySelector('#case-tags').innerHTML=project.tags.map(t=>`<span>${t}</span>`).join('');
  caseJumpValue.textContent=project.title;setCaseMenu(false);
  const art=caseBanner(project,source);
  // Prepare text-only DOM while the dialog is still hidden, never during the reveal.
  const build=window.PortfolioQuality.begin('project-core');renderProject(project);build({project:project.id});
  keyScreens.innerHTML='<p class="media-pending">关键界面将在接近此处时准备。</p>';
  dialog.classList.remove('case-loading');dialog.setAttribute('aria-busy','false');
  window.CaseEntrance?.prepare(dialog);
  dialog.scrollTo({top:0,behavior:'instant'});
  const transition=window.SurfaceMotion.open(dialog,source?.querySelector('.project-media'),art);
  done({project:project.id});caseRoute.enter(project.id);
  // Media activation stays outside the opening animation.
  await transition;
  if(ticket!==caseRevision||!dialog.open)return;
  window.CaseEntrance?.start(dialog);
  function near(element,callback){const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();if(ticket===caseRevision&&dialog.open)callback();},{root:dialog,rootMargin:'400px'});observer.observe(element);caseObservers.push(observer);}
  near(dialog.querySelector('.case-key-screens'),()=>{const done=window.PortfolioQuality.begin('project-key-screens');renderComparisons(project);window.CaseEntrance?.refresh(dialog);window.PortfolioMedia?.observe(dialog);done({project:project.id});});
  const overviewImage=dialog.querySelector('#case-image');overviewImage.removeAttribute('src');
  near(overviewMedia,()=>{overviewImage.src=project.image;});
  const video=dialog.querySelector('#case-video');
  if(project.video)near(dialog.querySelector('#case-video-section'),()=>{window.CaseVideo.attach(video,project);});
  const full=new Image();full.decoding='async';full.src=project.banner||project.cover||project.image;
  full.decode().then(()=>{if(ticket===caseRevision&&dialog.open){art.querySelector('img').src=full.src;}}).catch(()=>{});
  window.PortfolioMedia?.observe(dialog);
}
function renderProject(project) {
  activeProjectIndex = projects.findIndex((item) => item.id === project.id);
  dialog.querySelector("#case-index").textContent = project.product;
  dialog.querySelector("#case-title").textContent = project.title;
  dialog.querySelector("#case-summary").textContent = project.summary;
  dialog.querySelector("#case-overview-text").textContent = project.overview || project.summary;
  caseChallenge.textContent = project.challenge || "围绕核心任务与关键状态，建立清楚、连续且易于理解的体验。";
  dialog.querySelector("#case-story-title").textContent = project.storyTitle || (project.redesign ? "设计思路与改造重点" : project.editorDesign ? "编辑器的设计逻辑" : "流程与设计思路");
  let designNotes = dialog.querySelector(".case-design-notes");
  if (!designNotes) {
    designNotes = document.createElement("div");
    designNotes.className = "case-design-notes";
    caseFlow.before(designNotes);
  }
  designNotes.hidden = !project.designNotes?.length;
  designNotes.innerHTML = (project.designNotes || []).map(note => `<article>${note.label ? `<span>${note.label}</span>` : ""}<h4>${note.title}</h4><p>${note.text}</p></article>`).join("");
  caseFlow.innerHTML = project.redesign
    ? `<div class="redesign-context"><span>原有问题</span><strong>核心功能，被装进了小弹窗</strong><p>展示空间局促，身份与功能混杂，操作意图不够明确。</p></div><div class="redesign-context"><span>改造方向</span><strong>全屏展示，重新建立系统分量</strong><p>扩大视觉空间，分清信息层级，让功能切换与主要操作更清楚。</p></div>`
    : project.flow.map((step, index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><strong>${typeof step === "string" ? step : step.title}</strong>${typeof step === "string" ? "" : `<p>${step.note}</p>`}</div>`).join("");
  caseDecisions.innerHTML = project.decisions.map((decision, index) => `<article><span>0${index + 1}</span><h4>${decision.title}</h4><p>${decision.text}</p></article>`).join("");
  dialog.querySelector("#case-tags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  dialog.querySelector("#case-facts").innerHTML = `
    <div><span>PROJECT</span><strong>${project.product}</strong></div>
    <div><span>状态</span><strong>${project.stage}</strong></div>`;
  const image = dialog.querySelector("#case-image");
  image.removeAttribute('src');
  image.alt = project.alt;
  const banner = dialog.querySelector("#case-banner-image");
  banner.alt = `${project.title}项目横幅`;
  caseJumpValue.textContent = project.title;
  caseJumpMenu.querySelectorAll("[data-jump-project]").forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.jumpProject === project.id));
  });
  setCaseMenu(false);
  overviewMedia.classList.remove("is-expanded");

  const videoSection = dialog.querySelector("#case-video-section");
  const overviewSection = dialog.querySelector(".case-overview");
  const shell = dialog.querySelector(".case-shell");
  shell.classList.toggle("case-shell--shelter", Boolean(project.demoFirst));
  shell.classList.toggle("case-shell--kingdom", project.id === "kingdom");
  shell.classList.toggle("case-shell--redesign", Boolean(project.redesign));
  shell.classList.toggle("case-shell--editor", Boolean(project.editorDesign));
  shell.classList.toggle("case-shell--racing", project.id === "racing");
  shell.classList.toggle("case-shell--christmas", project.id === "christmas-match");
  shell.classList.toggle("case-shell--privilege", project.id === "privilege-card");
  let workflow = overviewSection.querySelector(".editor-workflow");
  if (!workflow) {
    workflow = document.createElement("section");
    workflow.className = "editor-workflow";
    overviewSection.append(workflow);
  }
  workflow.hidden = !project.editorDesign;
  if (project.editorDesign) workflow.innerHTML = `<header><h4>城市布局交互路径</h4><p>从方案管理进入城市编辑，按需选择操作模式，再确认修改并管理方案。</p></header><div class="editor-map"><article><small>方案管理</small><h5>选择与预览布局</h5><p>使用中／待选／未完成</p></article><article><small>进入编辑</small><h5>城市画布与工具</h5><p>工具展开／收起 · 对象分类</p></article><article class="editor-map-branches"><small>编辑模式 · 按需选择</small><h5>围绕当前对象操作</h5><ul><li>建筑与装饰摆放</li><li>选路、铺路与方向调整</li><li>删除模式与整理</li></ul></article><article><small>处理编辑结果</small><h5>预览与确认修改</h5><p>局部取消／确认 · 保存方案</p></article><article><small>方案使用</small><h5>启用与后续管理</h5><p>启用布局 · 参观与替换参考方案</p></article></div><footer>贯穿编辑的反馈：对象繁荣度 → 场景数值变化 → 成就与规则查阅</footer>`;
  overviewSection.classList.toggle("case-overview--state-map", Boolean(project.demoFirst || project.flowImage));
  shell.insertBefore(overviewSection, dialog.querySelector(".case-story"));
  shell.insertBefore(videoSection, dialog.querySelector(".case-key-screens"));
  videoSection.querySelector(".eyebrow").textContent = "03 / PLAYABLE DEMO";
  videoSection.querySelector("h3").textContent = project.demoFirst ? "实录 Demo" : "功能演示";
  overviewSection.querySelector(".eyebrow").textContent = project.demoFirst ? "01 / ALL STATES" : "01 / OVERVIEW";
  overviewSection.querySelector("h3").textContent = project.demoFirst ? "全状态汇总" : "项目概览";
  if (project.demoFirst) {
    overviewMedia.querySelector("span").textContent = "ALL STATES / CLICK TO ZOOM";
    overviewMedia.setAttribute("aria-label", "放大查看完整状态汇总图");
  }
  if (project.flowImage) {
    overviewSection.querySelector(".eyebrow").textContent = "01 / OVERVIEW & FLOW";
    overviewMedia.querySelector("span").textContent = "FULL FLOW / CLICK TO EXPLORE";
    overviewMedia.setAttribute("aria-label", `放大查看${project.title}完整流程图`);
  }
  if (project.editorDesign) {
    overviewMedia.querySelector("span").textContent = "EDITOR OVERVIEW / CLICK TO VIEW";
    overviewMedia.setAttribute("aria-label", "放大查看城市编辑界面");
  }
  const video = dialog.querySelector("#case-video");
  video.pause();
  video.removeAttribute("src");
  video.preload='none';
  video.poster = `assets/project-thumbs/${project.id}-960.webp`;
  if (project.video) {
    videoSection.hidden = false;
  } else {
    videoSection.hidden = true;
  }
  dialog.querySelector("#case-key-index").textContent = `${project.video ? "04" : "03"} / KEY INTERFACES`;
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects.find((item) => item.id === button.dataset.project);
    if (project) openProject(project, button);
  });
});

dialog.addEventListener("close", () => {
  ++caseRevision;releaseCaseMedia();caseRoute.clear();
  const video = dialog.querySelector("#case-video");
  video.pause();
  video.removeAttribute('src');video.load();
  overviewMedia.classList.remove("is-expanded");
  setCaseMenu(false);
  document.body.classList.remove("dialog-open");
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeProject();
  }
});
dialog.addEventListener("cancel", (event) => {
  if (!caseJumpMenu.hidden) {
    event.preventDefault();
    setCaseMenu(false);
    caseJumpButton.focus();
    return;
  }
  if (!overviewMedia.classList.contains("is-expanded")) {
    event.preventDefault();closeProject();
    return;
  }
  event.preventDefault();
  overviewMedia.classList.remove("is-expanded");
});
dialog.querySelector(".case-back").addEventListener("click", () => {
  closeProject();
});
dialog.querySelector(".case-prev").addEventListener("click", () => {
  const index = (activeProjectIndex - 1 + projects.length) % projects.length;
  openProject(projects[index]);
});
dialog.querySelector(".case-next").addEventListener("click", () => {
  const index = (activeProjectIndex + 1) % projects.length;
  openProject(projects[index]);
});
caseJumpButton.addEventListener("click", () => {
  const willOpen = caseJumpMenu.hidden;
  setCaseMenu(willOpen);
  if (willOpen) {
    const selected = caseJumpMenu.querySelector('[aria-selected="true"]');
    (selected || caseJumpMenu.querySelector("button"))?.focus();
  }
});
caseJumpButton.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowDown") return;
  event.preventDefault();
  setCaseMenu(true);
  const selected = caseJumpMenu.querySelector('[aria-selected="true"]');
  (selected || caseJumpMenu.querySelector("button"))?.focus();
});
caseJumpMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-jump-project]");
  if (!option) return;
  const project = projects.find((item) => item.id === option.dataset.jumpProject);
  if (project) openProject(project);
});
caseJumpMenu.addEventListener("keydown", (event) => {
  const options = [...caseJumpMenu.querySelectorAll("[data-jump-project]")];
  const index = options.indexOf(document.activeElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    options[(index + delta + options.length) % options.length].focus();
  }
  if (event.key === "Escape") {
    event.preventDefault();
    setCaseMenu(false);
    caseJumpButton.focus();
  }
});
dialog.addEventListener("pointerdown", (event) => {
  if (!caseJumpMenu.hidden && !event.target.closest(".case-jump-wrap")) setCaseMenu(false);
});
overviewMedia.addEventListener("click", () => {
  const project = projects[activeProjectIndex];
  openCaseImage(project.image, project.demoFirst ? "Shelter Check · 全状态汇总" : project.flowTitle || `${project.title} · ${project.flowImage ? "完整流程图" : "项目全图"}`);
});

const reducedMotion = window.PortfolioMotion.media.matches;
const revealItems = document.querySelectorAll(".reveal:not(.project-card)");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

const hero = document.querySelector(".hero");
const heroConsole = document.querySelector(".hero-console");
const moduleDisplay = document.querySelector(".module-display");
const moduleIndex = document.querySelector("#module-index");
const moduleTitle = document.querySelector("#module-title");
const moduleDescription = document.querySelector("#module-description");
const pointerReadout = document.querySelector("#pointer-readout");
const moduleButtons = [...document.querySelectorAll(".module-button")];

function activateModule(button, confirmed = false) {
  moduleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
  moduleIndex.textContent = button.dataset.index;
  moduleTitle.textContent = button.dataset.title;
  moduleDescription.textContent = button.dataset.description;
  moduleDisplay.classList.remove("is-changing");
  void moduleDisplay.offsetWidth;
  moduleDisplay.classList.add("is-changing");
  if (confirmed) {
    heroConsole.classList.remove("is-confirmed");
    void heroConsole.offsetWidth;
    heroConsole.classList.add("is-confirmed");
  }
}

moduleButtons.forEach((button) => {
  button.addEventListener("pointerenter", () => activateModule(button));
  button.addEventListener("focus", () => activateModule(button));
  button.addEventListener("click", () => activateModule(button, true));
});

if (window.matchMedia("(pointer: fine)").matches && !reducedMotion) {
  let coverFrame = 0;
  hero.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(coverFrame);
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    coverFrame = requestAnimationFrame(() => {
      hero.style.setProperty("--light-x", `${(x * 100).toFixed(1)}%`);
      hero.style.setProperty("--light-y", `${(y * 100).toFixed(1)}%`);
      hero.style.setProperty("--move-x", `${((x - .5) * 44).toFixed(1)}px`);
      hero.style.setProperty("--move-y", `${((y - .5) * 32).toFixed(1)}px`);
      hero.style.setProperty("--cover-rotate-x", `${((.5 - y) * 8).toFixed(2)}deg`);
      hero.style.setProperty("--cover-rotate-y", `${((x - .5) * 10).toFixed(2)}deg`);
    });
  });
  hero.addEventListener("pointerleave", () => {
    cancelAnimationFrame(coverFrame);
    hero.style.setProperty("--move-x", "0px");
    hero.style.setProperty("--move-y", "0px");
    hero.style.setProperty("--cover-rotate-x", "0deg");
    hero.style.setProperty("--cover-rotate-y", "0deg");
    hero.style.setProperty("--light-x", "65%");
    hero.style.setProperty("--light-y", "35%");
  });
  heroConsole?.addEventListener("pointermove", (event) => {
    const bounds = heroConsole.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    heroConsole.style.setProperty("--tilt-x", `${((.5 - y) * 3).toFixed(2)}deg`);
    heroConsole.style.setProperty("--tilt-y", `${((x - .5) * 3).toFixed(2)}deg`);
    pointerReadout.textContent = `X ${String(Math.round(x * 100)).padStart(3, "0")} / Y ${String(Math.round(y * 100)).padStart(3, "0")}`;
  });
  heroConsole?.addEventListener("pointerleave", () => {
    heroConsole.style.setProperty("--tilt-x", "0deg");
    heroConsole.style.setProperty("--tilt-y", "0deg");
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
