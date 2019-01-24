const bindings: { label: string; subgroups: Section[] }[] = [
  {
    label: 'Abilities and Summoner Spells',
    subgroups: [
      {
        label: 'Normal Cast',
        twoSets: false,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtNormalCastSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtNormalCastSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtNormalCastSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtNormalCastSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtNormalCastAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtNormalCastAvatarSpell2',
          },
        ],
      },
      {
        label: 'Quick Cast',
        twoSets: false,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtSmartCastSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtSmartCastSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastAvatarSpell2',
          },
        ],
      },
      {
        label: 'Quick Cast With Indicator',
        twoSets: false,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorAvatarSpell2',
          },
        ],
      },
      {
        label: 'Self Cast',
        twoSets: true,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSelfCastSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSelfCastSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtSelfCastSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtSelfCastSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSelfCastAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSelfCastAvatarSpell2',
          },
        ],
      },
      {
        label: 'Quick + Self Cast',
        twoSets: true,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastAvatarSpell2',
          },
        ],
      },
      {
        label: 'Quick Cast With Indicator + Self Cast',
        twoSets: true,
        controls: [
          {
            label: 'Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorSpell1',
          },
          {
            label: 'Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorSpell2',
          },
          {
            label: 'Spell 3',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorSpell3',
          },
          {
            label: 'Spell 4',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorSpell4',
          },
          {
            label: 'Summoner Spell 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorAvatarSpell1',
          },
          {
            label: 'Summoner Spell 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorAvatarSpell2',
          },
        ],
      },
      {
        label: 'Other',
        twoSets: true,
        controls: [
          {
            label: 'Level Up Spell 1',
            section: 'GameEvents',
            dataKey: 'evtLevelSpell1',
          },
          {
            label: 'Level Up Spell 2',
            section: 'GameEvents',
            dataKey: 'evtLevelSpell2',
          },
          {
            label: 'Level Up Spell 3',
            section: 'GameEvents',
            dataKey: 'evtLevelSpell3',
          },
          {
            label: 'Level Up Spell 4',
            section: 'GameEvents',
            dataKey: 'evtLevelSpell4',
          },
          {
            label: 'Target Champions Only',
            section: 'GameEvents',
            dataKey: 'evtChampionOnly',
          },
          {
            label: 'Teleport Home',
            section: 'GameEvents',
            dataKey: 'evtUseItem7',
          },
        ],
      },
    ],
  },
  {
    label: 'Items',
    subgroups: [
      {
        label: 'Normal Cast',
        twoSets: false,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtNormalCastVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtNormalCastItem6',
          },
        ],
      },
      {
        label: 'Quick Cast',
        twoSets: false,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtSmartCastVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtSmartCastItem6',
          },
        ],
      },
      {
        label: 'Quick Cast With Indicator',
        twoSets: false,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtSmartCastWithIndicatorItem6',
          },
        ],
      },
      {
        label: 'Self Cast',
        twoSets: true,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtSelfCastVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtSelfCastItem6',
          },
        ],
      },
      {
        label: 'Quick + Self Cast',
        twoSets: true,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastItem6',
          },
        ],
      },
      {
        label: 'Quick Cast With Indicator + Self Cast',
        twoSets: false,
        controls: [
          {
            label: 'Trinket',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorVisionItem',
          },
          {
            label: 'Item 1',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem1',
          },
          {
            label: 'Item 2',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem2',
          },
          {
            label: 'Item 3',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem3',
          },
          {
            label: 'Item 4',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem4',
          },
          {
            label: 'Item 5',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem5',
          },
          {
            label: 'Item 6',
            section: 'GameEvents',
            dataKey: 'evtSmartPlusSelfCastWithIndicatorItem6',
          },
        ],
      },
    ],
  },
  {
    label: 'Player Movement',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Player Move Click',
            section: 'GameEvents',
            dataKey: 'evtPlayerMoveClick',
          },
          {
            label: 'Player Attack Move Click',
            section: 'GameEvents',
            dataKey: 'evtPlayerAttackMoveClick',
          },
          {
            label: 'Player Attack Only Click',
            section: 'GameEvents',
            dataKey: 'evtPlayerAttackOnlyClick',
          },
          {
            label: 'Player Attack Move',
            section: 'GameEvents',
            dataKey: 'evtPlayerAttackMove',
          },
          {
            label: 'Player Hold Position',
            section: 'GameEvents',
            dataKey: 'evtPlayerHoldPosition',
          },
          {
            label: 'Player Stop Position',
            section: 'GameEvents',
            dataKey: 'evtPlayerStopPosition',
          },
          {
            label: 'Move Pet Click',
            section: 'GameEvents',
            dataKey: 'evtPetMoveClick',
          },
        ],
      },
    ],
  },
  {
    label: 'Camera Control',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Center Camera On Champion',
            section: 'GameEvents',
            dataKey: 'evtCameraSnap',
          },
          {
            label: 'Select Self',
            section: 'GameEvents',
            dataKey: 'evtSelectSelf',
          },
          {
            label: 'Select Ally 1',
            section: 'GameEvents',
            dataKey: 'evtSelectAlly1',
          },
          {
            label: 'Select Ally 2',
            section: 'GameEvents',
            dataKey: 'evtSelectAlly2',
          },
          {
            label: 'Select Ally 3',
            section: 'GameEvents',
            dataKey: 'evtSelectAlly3',
          },
          {
            label: 'Select Ally 4',
            section: 'GameEvents',
            dataKey: 'evtSelectAlly4',
          },
          {
            label: 'Toggle Camera Lock',
            section: 'GameEvents',
            dataKey: 'evtCameraLockToggle',
          },
          {
            label: 'Scroll Up',
            section: 'GameEvents',
            dataKey: 'evtScrollUp',
          },
          {
            label: 'Scroll Down',
            section: 'GameEvents',
            dataKey: 'evtScrollDown',
          },
          {
            label: 'Scroll Left',
            section: 'GameEvents',
            dataKey: 'evtScrollLeft',
          },
          {
            label: 'Scroll Right',
            section: 'GameEvents',
            dataKey: 'evtScrollRight',
          },
          {
            label: 'Drag Scroll',
            section: 'GameEvents',
            dataKey: 'evtOnUIMouse4Pan',
          },
          {
            label: 'Drag Scroll Lock',
            section: 'GameEvents',
            dataKey: 'evtDragScrollLock',
          },
        ],
      },
    ],
  },
  {
    label: 'Display',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Show Health Bars',
            section: 'GameEvents',
            dataKey: 'evtShowHealthBars',
          },
          {
            label: 'Toggle Minion Health Bars',
            section: 'GameEvents',
            dataKey: 'evtToggleMinionHealthBars',
          },
          {
            label: 'Show Summoner Names',
            section: 'GameEvents',
            dataKey: 'evtShowSummonerNames',
          },
          {
            label: 'Show/Hide HUD',
            section: 'GameEvents',
            dataKey: 'evtDrawHud',
          },
          {
            label: 'Toggle FPS Display',
            section: 'HUDEvents',
            dataKey: 'evtToggleFPSAndLatency',
          },
        ],
      },
    ],
  },
  {
    label: 'Communication',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Alert Ping',
            section: 'GameEvents',
            dataKey: 'evntPlayerPingCursor',
          },
          {
            label: 'Quick Alert Ping',
            section: 'GameEvents',
            dataKey: 'evntPlayerPing',
          },
          {
            label: 'Quick Retreat Ping',
            section: 'GameEvents',
            dataKey: 'evntPlayerPingDanger',
          },
          {
            label: 'Retreat Ping',
            section: 'GameEvents',
            dataKey: 'evntPlayerPingCursorDanger',
          },
          {
            label: 'On My Way Ping',
            section: 'GameEvents',
            dataKey: 'evtPlayerPingOMW',
          },
          {
            label: 'Missing Enemy Ping',
            section: 'GameEvents',
            dataKey: 'evtPlayerPingMIA',
          },
          {
            label: 'Danger Ping',
            section: 'GameEvents',
            dataKey: 'evtPlayerPingRadialDanger',
          },
          {
            label: 'Assist Me Ping',
            section: 'GameEvents',
            dataKey: 'evtPlayerPingComeHere',
          },
          {
            label: 'Area Is Warded Ping',
            section: 'GameEvents',
            dataKey: 'evtPlayerPingAreaIsWarded',
          },
          {
            label: 'Joke',
            section: 'GameEvents',
            dataKey: 'evtEmoteJoke',
          },
          {
            label: 'Taunt',
            section: 'GameEvents',
            dataKey: 'evtEmoteTaunt',
          },
          {
            label: 'Dance',
            section: 'GameEvents',
            dataKey: 'evtEmoteDance',
          },
          {
            label: 'Laugh',
            section: 'GameEvents',
            dataKey: 'evtEmoteLaugh',
          },
          {
            label: 'Toggle',
            section: 'GameEvents',
            dataKey: 'evtEmoteToggle',
          },
          {
            label: 'Mastery Emote',
            section: 'GameEvents',
            dataKey: 'evtChampMasteryDisplay',
          },
          {
            label: 'Chat History',
            section: 'GameEvents',
            dataKey: 'evtChatHistory',
          },
          {
            label: 'Open Emote Wheel',
            section: 'GameEvents',
            dataKey: 'evtRadialEmoteOpen',
          },
          {
            label: 'Open Instant Emote Wheel',
            section: 'GameEvents',
            dataKey: 'evtRadialEmoteInstantOpen',
          },
          {
            label: 'Quick Play Emote North',
            section: 'GameEvents',
            dataKey: 'evtRadialEmotePlaySlot0',
          },
          {
            label: 'Quick Play Emote East',
            section: 'GameEvents',
            dataKey: 'evtRadialEmotePlaySlot1',
          },
          {
            label: 'Quick Play Emote South',
            section: 'GameEvents',
            dataKey: 'evtRadialEmotePlaySlot2',
          },
          {
            label: 'Quick Play Emote West',
            section: 'GameEvents',
            dataKey: 'evtRadialEmotePlaySlot3',
          },
          {
            label: 'Quick Play Emote Center',
            section: 'GameEvents',
            dataKey: 'evtRadialEmotePlaySlot4',
          },
        ],
      },
    ],
  },
  {
    label: 'Menus',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Show Scoreboard',
            section: 'GameEvents',
            dataKey: 'evtShowScoreBoard',
          },
          {
            label: 'Show Scoreboard (Hold)',
            section: 'HUDEvents',
            dataKey: 'evtHoldShowScoreBoard',
          },
          {
            label: 'Toggle Mouse Screen Lock',
            section: 'HUDEvents',
            dataKey: 'evtToggleMouseClip',
          },
          {
            label: 'System Menu',
            section: 'GameEvents',
            dataKey: 'evtSysMenu',
          },
          {
            label: 'Show Advanced Player Stats',
            section: 'GameEvents',
            dataKey: 'evtShowCharacterMenu',
          },
          {
            label: 'Toggle Basic Player Stats',
            section: 'HUDEvents',
            dataKey: 'evtTogglePlayerStats',
          },
        ],
      },
    ],
  },
  {
    label: 'Item Shop',
    subgroups: [
      {
        twoSets: true,
        controls: [
          {
            label: 'Open Shop',
            section: 'GameEvents',
            dataKey: 'evtOpenShop',
          },
          {
            label: 'Focus Shop Search Bar',
            section: 'ShopEvents',
            dataKey: 'evtShopFocusSearch',
          },
          {
            label: 'Switch Shop Tabs',
            section: 'ShopEvents',
            dataKey: 'evtShopSwitchTabs',
          },
        ],
      },
    ],
  },
];

export default bindings;
