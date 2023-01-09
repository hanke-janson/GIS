export default [
  {
    id: 2490,
    task_name: "JL1KF01A_PMS05_20220530104131_200086428_101_0014_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-05T13:26:14.078134+08:00",
    start_time: "2022-08-05T15:48:00.003163+08:00",
    end_time: null,
    archive: "JL1KF01A_PMS05_20220530104131_200086428_101_0014_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Processing",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "processing",
      },
      { name: "云检测", operator: "CloudDetect", status: "waiting" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "waiting",
      },
      { name: "融合", operator: "Fusion", status: "waiting" },
    ],
    result: {
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS05_20220530104131_200086428_101_0014_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS05_20220530104131_200086428_101_0014_001_L2D_PAN.tif",
      ],
    },
    extent:
      "POLYGON((111.877641905673 32.670271388621,111.605687034976 32.7204182703359,111.605570718637 32.7204400796495,111.605527100009 32.7204764285055,111.605527100009 32.7205273169038,111.612666015325 32.7477526100355,111.633370323693 32.8266368972909,111.666651336231 32.9532036138255,111.730290913287 32.9415356310548,111.801832731634 32.9283773451888,111.871557107182 32.9155171199418,111.939507658557 32.9029476855427,111.877714603385 32.6704749422145,111.877663714987 32.6702859281634,111.877641905673 32.670271388621))",
  },
  {
    id: 2489,
    task_name: "JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-05T12:28:49.785723+08:00",
    start_time: "2022-08-05T15:45:50.003597+08:00",
    end_time: null,
    archive: "JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Processing",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "processing" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "waiting",
      },
      { name: "融合", operator: "Fusion", status: "waiting" },
    ],
    result: {
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS01_20220520103150_200085046_101_0013_001_L2D_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.945735901835 34.6324897235854,112.664761191017 34.6825829408278,112.693459038584 34.7967138427496,112.712717097657 34.8731672240877,112.723559496234 34.916143493873,112.788569360389 34.9046331857333,112.862506949038 34.8914976309897,112.936830440991 34.8782507579856,113.005350540962 34.865998328109,112.945817535226 34.6327197813238,112.945758165487 34.6324897235854,112.945735901835 34.6324897235854))",
  },
  {
    id: 2488,
    task_name: "JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L1",
    satellite: "JL1GF03D",
    sensor: "PMS",
    create_time: "2022-08-05T11:11:33.124481+08:00",
    start_time: "2022-08-05T15:14:40.003487+08:00",
    end_time: null,
    archive: "JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Processing",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "processing" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L2E_MSS_merge.zip",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D13_PMS_20220706111526_200091752_102_0044_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.670075369935 33.0902444322553,112.488795964783 33.1218325895728,112.508620111481 33.2019078318067,112.527041275397 33.2761747253266,112.567910163812 33.2690896622818,112.617540679695 33.2604613181777,112.664835229247 33.2522187943385,112.708678441158 33.2445585083535,112.670117459418 33.0902584620831,112.670110444504 33.0902444322553,112.670075369935 33.0902444322553))",
  },
  {
    id: 2487,
    task_name: "JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L1",
    satellite: "JL1GF03D",
    sensor: "PMS",
    create_time: "2022-08-05T10:45:51.763633+08:00",
    start_time: "2022-08-05T10:46:10.002993+08:00",
    end_time: "2022-08-05T11:52:08.344767+08:00",
    archive: "JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220718111208_200093189_102_0050_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((114.552262208634 31.9000578419472,114.370452040279 31.9345686968915,114.390553797005 32.0122500618668,114.410911084537 32.0907760981169,114.453393081008 32.0827481719668,114.505201951892 32.0729315301758,114.558345261429 32.0628380633451,114.593033568322 32.056229752783,114.555726070669 31.9133241496171,114.552262208634 31.9000578419472))",
  },
  {
    id: 2486,
    task_name: "ZY302_TMS_E122.0_N29.9_20210219_L1A0000840534",
    satellite: "ZY302",
    sensor: "FWD",
    create_time: "2022-08-05T10:25:48.500895+08:00",
    start_time: "2022-08-05T10:26:00.004546+08:00",
    end_time: "2022-08-05T11:42:42.995142+08:00",
    archive: "ZY302_TMS_E122.0_N29.9_20210219_L1A0000840534.tar.gz",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/ZY302_TMS_E122.0_N29.9_20210219_L2E0000840534-MUX_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/ZY302_TMS_E122.0_N29.9_20210219_L3B0000840534.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/ZY302_TMS_E122.0_N29.9_20210219_L2E0000840534-MUX.tiff",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/ZY302_TMS_E122.0_N29.9_20210219_L2E0000840534-NAD.tiff",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/ZY302_TMS_E122.0_N29.9_20210219_L2D0000840534-MUX.tiff",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/ZY302_TMS_E122.0_N29.9_20210219_L2D0000840534-NAD.tiff",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/ZY302_TMS_E122.0_N29.9_20210219_L3A0000840534-MUX.tiff",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/ZY302_TMS_E122.0_N29.9_20210219_L3A0000840534-NAD.tiff",
      ],
    },
    extent:
      "POLYGON((122.191122417027 29.4821872202748,121.630986808137 29.5822178071172,121.681403472615 29.7984230166635,121.732890459913 30.0184635496464,121.805248742192 30.0058426597327,121.882044404494 29.9923521325282,121.927889898598 29.9842578162054,122.018220684888 29.9682029739124,122.109220422941 29.9519474460907,122.15696128037 29.9433625651423,122.236410451329 29.9290024006469,122.295590383892 29.9182322772753,122.19125620738 29.4823433090193,122.191211610595 29.4821872202748,122.191122417027 29.4821872202748))",
  },
  {
    id: 2485,
    task_name: "JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L1",
    satellite: "JL1KF01B",
    sensor: "PMS",
    create_time: "2022-08-05T10:19:37.202678+08:00",
    start_time: "2022-08-05T10:19:40.003746+08:00",
    end_time: "2022-08-05T11:42:57.802813+08:00",
    archive: "JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01B_PMSL5_20220602103828_200086957_101_0026_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((113.865780166303 34.2659532593312,113.727592913765 34.2912926539479,113.742199364726 34.3477551732678,113.756723811174 34.4038221414059,113.826133396009 34.3911259132256,113.868008759547 34.3834464317427,113.895118486893 34.3784634516096,113.865828404252 34.2660497352293,113.865804285278 34.2659580831261,113.865780166303 34.2659532593312))",
  },
  {
    id: 2482,
    task_name: "JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L1",
    satellite: "JL1GF02A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.294206+08:00",
    start_time: "2022-08-05T04:15:35.0164+08:00",
    end_time: "2022-08-05T05:58:37.8905+08:00",
    archive: "JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L1.tar.gz",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20200429103115_200024973_101_0030_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((113.583866398109 33.8621882696078,113.298157346889 33.904370317737,113.322604838318 34.0132336096706,113.346259531293 34.1183655784499,113.412716723361 34.1086451800251,113.488179071771 34.0975546190563,113.562659039489 34.0865588492069,113.632744146217 34.0761662955719,113.583952571854 33.8622916781017,113.58392671973 33.8621882696078,113.583866398109 33.8621882696078))",
  },
  {
    id: 2481,
    task_name: "JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L1",
    satellite: "JL1GF02B",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.288405+08:00",
    start_time: "2022-08-05T04:04:52.090021+08:00",
    end_time: "2022-08-05T06:03:42.880085+08:00",
    archive: "JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L1.tar.gz",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02B_PMS1_20200502105430_200025069_101_0042_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((111.092164550211 34.0180774343715,110.865102722944 34.0589594900819,110.890104971891 34.154863746321,110.914740597866 34.249157736958,110.966872946734 34.2398268228887,111.030284343502 34.2284399447025,111.092940928269 34.2171537081163,111.142298444448 34.2082325491333,111.142082783876 34.2072764539321,111.13968895153 34.1981827664917,111.139336705929 34.1968456709471,111.092229248382 34.0181924533431,111.09220049364 34.0180846230573,111.092164550211 34.0180774343715))",
  },
  {
    id: 2480,
    task_name: "JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L1",
    satellite: "JL1GF02B",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.283406+08:00",
    start_time: "2022-08-05T03:38:51.823394+08:00",
    end_time: "2022-08-05T05:34:22.568809+08:00",
    archive: "JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02B_PMS1_20220521102823_200085196_105_0002_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((110.387671414642 34.3863116628134,110.151425738381 34.4295326630434,110.177949230384 34.5279554033308,110.203710042411 34.6233200190516,110.257682608914 34.6135014399348,110.318178680848 34.6024610919233,110.378215663864 34.5914725765316,110.44052587749 34.5800323768819,110.387715842602 34.3863338767933,110.387708437942 34.3863116628134,110.387671414642 34.3863116628134))",
  },
  {
    id: 2479,
    task_name: "JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L1",
    satellite: "JL1GF03B",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.277219+08:00",
    start_time: "2022-08-05T03:13:54.211067+08:00",
    end_time: "2022-08-05T04:04:47.626057+08:00",
    archive: "JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03B01_PMS_20220517100132_200084770_102_0003_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.476554308496 34.8858352740165,112.276574857527 34.9232864436877,112.276584852502 34.9233863934333,112.276784751993 34.9241060316015,112.296824675983 34.9960898383729,112.321132454109 35.0832360215497,112.419822832901 35.0648152834381,112.476304434132 35.0542306053805,112.521501709087 35.0457348770057,112.476554308496 34.8858352740165))",
  },
  {
    id: 2477,
    task_name: "JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.266258+08:00",
    start_time: "2022-08-05T02:30:17.582718+08:00",
    end_time: "2022-08-05T05:06:03.410542+08:00",
    archive: "JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS02_20220530104131_200086428_101_0013_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((111.137858722013 33.0447199225402,110.86732857963 33.0930149479586,110.897394706565 33.2113005657695,110.926131943912 33.3241045140286,110.988250309939 33.3130833971169,111.060682014728 33.3001917236652,111.130029829004 33.2878128282611,111.19739875335 33.2757517108021,111.137887610917 33.0447343669923,111.137858722013 33.0447199225402))",
  },
  {
    id: 2476,
    task_name: "JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.261065+08:00",
    start_time: "2022-08-05T02:02:56.424711+08:00",
    end_time: "2022-08-05T05:11:03.190106+08:00",
    archive: "JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS03_20220530104131_200086429_101_0012_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((111.456511021023 33.197694184649,111.184837233442 33.2466981980679,111.215164081487 33.3641513419987,111.232479219285 33.431093548384,111.244780936433 33.478583392849,111.308419501464 33.4671727894879,111.381041652634 33.4541103654497,111.455011341724 33.4407653931378,111.517215430904 33.4295069311548,111.456561734816 33.1977231639591,111.456547245161 33.197694184649,111.456511021023 33.197694184649))",
  },
  {
    id: 2475,
    task_name: "JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.256427+08:00",
    start_time: "2022-08-05T01:57:55.373916+08:00",
    end_time: "2022-08-05T03:01:50.44365+08:00",
    archive: "JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS04_20220530104131_200086429_101_0012_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((111.723682603367 33.1487679214514,111.451354458151 33.1985116674844,111.481740515383 33.3147883993869,111.499538270491 33.382772486366,111.512003229022 33.4303105587125,111.579239998929 33.4180995428763,111.651163825421 33.4049960998577,111.722441911918 33.3919724674001,111.785064180298 33.3804942576241,111.723740647411 33.1489275425735,111.723697114378 33.1487679214514,111.723682603367 33.1487679214514))",
  },
  {
    id: 2473,
    task_name: "JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L1",
    satellite: "JL1KF01A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.245691+08:00",
    start_time: "2022-08-05T01:48:48.278736+08:00",
    end_time: "2022-08-05T04:15:34.868858+08:00",
    archive: "JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1KF01A_PMS06_20220530104131_200086429_101_0016_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.033049833442 32.2002766795159,111.761507356256 32.2510986605617,111.791610892733 32.3653408908771,111.809334249876 32.4324831905394,111.822899378847 32.483799506403,111.883324540691 32.4725533892985,111.956188038906 32.4589519121798,112.027604880816 32.4455830632106,112.095147010111 32.4329048290605,112.033064372701 32.2002766795159,112.033049833442 32.2002766795159))",
  },
  {
    id: 2471,
    task_name: "JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L1",
    satellite: "JL1GF02A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.226004+08:00",
    start_time: "2022-08-05T01:29:39.587701+08:00",
    end_time: "2022-08-05T03:38:49.124789+08:00",
    archive: "JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS1_20220504102654_200083061_101_0012_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((110.702479217144 34.5023320855262,110.456315568729 34.5479026746984,110.483689992688 34.6476494250935,110.510621538936 34.7455559422461,110.568249091966 34.7349497846791,110.635108354498 34.7226026595632,110.700150291256 34.710553331528,110.757373145689 34.6999166306706,110.702517396257 34.5023779004617,110.702502124611 34.5023320855262,110.702479217144 34.5023320855262))",
  },
  {
    id: 2470,
    task_name: "JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L1",
    satellite: "JL1GF02A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:32.21329+08:00",
    start_time: "2022-08-04T22:33:29.725441+08:00",
    end_time: "2022-08-05T00:09:06.856736+08:00",
    archive: "JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220505101751_200083355_101_0024_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.248316250762 34.5406139941004,112.010678370046 34.5840047923884,112.03685862544 34.6818460593544,112.062756253078 34.7784080638408,112.119133053048 34.7681739640046,112.181816914545 34.7567572901321,112.242358755145 34.7456976197423,112.300974264454 34.7349577649723,112.248390626488 34.5407478704064,112.248353438625 34.5406139941004,112.248316250762 34.5406139941004))",
  },
  {
    id: 2468,
    task_name: "JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L1",
    satellite: "JL1GF02A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:31.993701+08:00",
    start_time: "2022-08-04T22:17:41.375256+08:00",
    end_time: "2022-08-05T00:00:58.018483+08:00",
    archive: "JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220529100336_200086405_101_0014_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((114.032204549752 32.3555943324169,113.803155490092 32.3960866075016,113.827629325431 32.4959714537004,113.850786576681 32.5902973893024,113.905607675264 32.5806643823865,113.965314763689 32.5701390240326,114.028152396502 32.5590285171949,114.08035495562 32.5497685424375,114.03235815123 32.3561136516963,114.032233807177 32.355616275485,114.032226492821 32.3555943324169,114.032204549752 32.3555943324169))",
  },
  {
    id: 2467,
    task_name: "JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L1",
    satellite: "JL1GF03D",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:31.988518+08:00",
    start_time: "2022-08-05T01:22:49.388174+08:00",
    end_time: "2022-08-05T02:30:17.448998+08:00",
    archive: "JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220717112047_200093111_101_0052_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((113.164284053463 34.3323583270411,112.97332175857 34.3685901426103,112.991813031171 34.4359079958785,113.016711015879 34.5263745609247,113.059247502635 34.5183424827196,113.111477876879 34.5084518020261,113.1614706395 34.4989619963792,113.208081474456 34.490091724895,113.164364228472 34.3324676565993,113.164335073924 34.3323656156783,113.164284053463 34.3323583270411))",
  },
  {
    id: 2466,
    task_name: "JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L1",
    satellite: "JL1GF02A",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:31.977137+08:00",
    start_time: "2022-08-04T22:17:00.004228+08:00",
    end_time: "2022-08-04T23:52:42.491513+08:00",
    archive: "JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF02A_PMS2_20220506101016_200083448_101_0017_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((112.245632892185 32.4832742033176,112.01335804721 32.5231106673589,112.037316002154 32.6231113336214,112.06010077729 32.7180355992059,112.118243273428 32.7081262879988,112.179204352499 32.6977004825366,112.242253544059 32.6868836171385,112.292906873499 32.6781622427179,112.245677163121 32.4833184742537,112.245662406143 32.4832742033176,112.245632892185 32.4832742033176))",
  },
  {
    id: 2465,
    task_name: "JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L1",
    satellite: "JL1GF03D",
    sensor: "PMS",
    create_time: "2022-08-04T22:16:31.968342+08:00",
    start_time: "2022-08-05T00:51:22.018837+08:00",
    end_time: "2022-08-05T02:02:56.374778+08:00",
    archive: "JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L1.zip",
    pair_archive: "",
    priority: 2,
    status: "Done",
    procedure: [
      { name: "正射", operator: "Orthorectification", status: "completed" },
      {
        name: "几何",
        operator: "GeometricCorrection",
        status: "completed",
      },
      { name: "云检测", operator: "CloudDetect", status: "completed" },
      {
        name: "辐射大气",
        operator: "RadiometricAtmosphericCorrection",
        status: "completed",
      },
      { name: "融合", operator: "Fusion", status: "completed" },
    ],
    result: {
      CloudDetect: [
        "/mnt/glusterfs/rscb/common/image/l2/l2f/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L2E_MSS_merge.zip",
      ],
      Fusion: [
        "/mnt/glusterfs/rscb/common/image/l3/l3b/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L3B.tif",
      ],
      GeometricCorrection: [
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L2E_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2e/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L2E_PAN.tif",
      ],
      Orthorectification: [
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L2D_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l2/l2d/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L2D_PAN.tif",
      ],
      RadiometricAtmosphericCorrection: [
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L3A_MSS.tif",
        "/mnt/glusterfs/rscb/common/image/l3/l3a/JL1GF03D11_PMS_20220717112047_200093111_101_0050_001_L3A_PAN.tif",
      ],
    },
    extent:
      "POLYGON((113.243139187937 34.6162869058147,113.051527716222 34.6526053723669,113.073324633961 34.7314887606388,113.095158038005 34.8103502571285,113.138255659756 34.8022211086979,113.190182966967 34.7923989957826,113.244788368857 34.7820441828356,113.287156264538 34.7739880070121,113.24317567424 34.6163160948575,113.243161079719 34.6162869058147,113.243139187937 34.6162869058147))",
  },
];
