export type COUNTRY = {
  name: string;
  code: string;
  provinces: PROVINCE[];
};

export type PROVINCE = {
  name: string;
  code: string;
  subdivision?: string;
  native?: string;
};

export const COUNTRYPROVINCES: COUNTRY[] = [
  {
    name: 'Afghanistan',
    code: 'AF',
    provinces: [
      {
        name: 'Badakhshān',
        code: 'AF-BDS',
      },
      {
        name: 'Baghlān',
        code: 'AF-BGL',
      },
      {
        name: 'Balkh',
        code: 'AF-BAL',
      },
      {
        name: 'Bādghīs',
        code: 'AF-BDG',
      },
      {
        name: 'Bāmyān',
        code: 'AF-BAM',
      },
      {
        name: 'Dāykundī',
        code: 'AF-DAY',
      },
      {
        name: 'Farāh',
        code: 'AF-FRA',
      },
      {
        name: 'Fāryāb',
        code: 'AF-FYB',
      },
      {
        name: 'Ghaznī',
        code: 'AF-GHA',
      },
      {
        name: 'Ghōr',
        code: 'AF-GHO',
      },
      {
        name: 'Helmand',
        code: 'AF-HEL',
      },
      {
        name: 'Herāt',
        code: 'AF-HER',
      },
      {
        name: 'Jowzjān',
        code: 'AF-JOW',
      },
      {
        name: 'Kandahār',
        code: 'AF-KAN',
      },
      {
        name: 'Khōst',
        code: 'AF-KHO',
      },
      {
        name: 'Kunar',
        code: 'AF-KNR',
      },
      {
        name: 'Kunduz',
        code: 'AF-KDZ',
      },
      {
        name: 'Kābul',
        code: 'AF-KAB',
      },
      {
        name: 'Kāpīsā',
        code: 'AF-KAP',
      },
      {
        name: 'Laghmān',
        code: 'AF-LAG',
      },
      {
        name: 'Lōgar',
        code: 'AF-LOG',
      },
      {
        name: 'Nangarhār',
        code: 'AF-NAN',
      },
      {
        name: 'Nīmrōz',
        code: 'AF-NIM',
      },
      {
        name: 'Nūristān',
        code: 'AF-NUR',
      },
      {
        name: 'Paktiyā',
        code: 'AF-PIA',
      },
      {
        name: 'Paktīkā',
        code: 'AF-PKA',
      },
      {
        name: 'Panjshayr',
        code: 'AF-PAN',
      },
      {
        name: 'Parwān',
        code: 'AF-PAR',
      },
      {
        name: 'Samangān',
        code: 'AF-SAM',
      },
      {
        name: 'Sar-e Pul',
        code: 'AF-SAR',
      },
      {
        name: 'Takhār',
        code: 'AF-TAK',
      },
      {
        name: 'Uruzgān',
        code: 'AF-URU',
      },
      {
        name: 'Wardak',
        code: 'AF-WAR',
      },
      {
        name: 'Zābul',
        code: 'AF-ZAB',
      },
    ],
  },
  //   { name: 'Åland Islands', code: 'AX' },
  {
    name: 'Albania',
    code: 'AL',
    provinces: [
      {
        name: 'Berat',
        code: 'AL-01',
      },
      {
        name: 'Dibër',
        code: 'AL-09',
      },
      {
        name: 'Durrës',
        code: 'AL-02',
      },
      {
        name: 'Elbasan',
        code: 'AL-03',
      },
      {
        name: 'Fier',
        code: 'AL-04',
      },
      {
        name: 'Gjirokastër',
        code: 'AL-05',
      },
      {
        name: 'Korçë',
        code: 'AL-06',
      },
      {
        name: 'Kukës',
        code: 'AL-07',
      },
      {
        name: 'Lezhë',
        code: 'AL-08',
      },
      {
        name: 'Shkodër',
        code: 'AL-10',
      },
      {
        name: 'Tiranë',
        code: 'AL-11',
      },
      {
        name: 'Vlorë',
        code: 'AL-12',
      },
    ],
  },
  {
    name: 'Algeria',
    code: 'DZ',
    provinces: [
      {
        name: 'Adrar',
        code: 'DZ-01',
      },
      {
        name: 'Alger',
        code: 'DZ-16',
      },
      {
        name: 'Annaba',
        code: 'DZ-23',
      },
      {
        name: 'Aïn Defla',
        code: 'DZ-44',
      },
      {
        name: 'Aïn Témouchent',
        code: 'DZ-46',
      },
      {
        name: 'Batna',
        code: 'DZ-05',
      },
      {
        name: 'Biskra',
        code: 'DZ-07',
      },
      {
        name: 'Blida',
        code: 'DZ-09',
      },
      {
        name: 'Bordj Bou Arréridj',
        code: 'DZ-34',
      },
      {
        name: 'Bouira',
        code: 'DZ-10',
      },
      {
        name: 'Boumerdès',
        code: 'DZ-35',
      },
      {
        name: 'Béchar',
        code: 'DZ-08',
      },
      {
        name: 'Béjaïa',
        code: 'DZ-06',
      },
      {
        name: 'Chlef',
        code: 'DZ-02',
      },
      {
        name: 'Constantine',
        code: 'DZ-25',
      },
      {
        name: 'Djelfa',
        code: 'DZ-17',
      },
      {
        name: 'El Bayadh',
        code: 'DZ-32',
      },
      {
        name: 'El Oued',
        code: 'DZ-39',
      },
      {
        name: 'El Tarf',
        code: 'DZ-36',
      },
      {
        name: 'Ghardaïa',
        code: 'DZ-47',
      },
      {
        name: 'Guelma',
        code: 'DZ-24',
      },
      {
        name: 'Illizi',
        code: 'DZ-33',
      },
      {
        name: 'Jijel',
        code: 'DZ-18',
      },
      {
        name: 'Khenchela',
        code: 'DZ-40',
      },
      {
        name: 'Laghouat',
        code: 'DZ-03',
      },
      {
        name: 'Mascara',
        code: 'DZ-29',
      },
      {
        name: 'Mila',
        code: 'DZ-43',
      },
      {
        name: 'Mostaganem',
        code: 'DZ-27',
      },
      {
        name: 'Msila',
        code: 'DZ-28',
      },
      {
        name: 'Médéa',
        code: 'DZ-26',
      },
      {
        name: 'Naama',
        code: 'DZ-45',
      },
      {
        name: 'Oran',
        code: 'DZ-31',
      },
      {
        name: 'Ouargla',
        code: 'DZ-30',
      },
      {
        name: 'Oum el Bouaghi',
        code: 'DZ-04',
      },
      {
        name: 'Relizane',
        code: 'DZ-48',
      },
      {
        name: 'Saïda',
        code: 'DZ-20',
      },
      {
        name: 'Sidi Bel Abbès',
        code: 'DZ-22',
      },
      {
        name: 'Skikda',
        code: 'DZ-21',
      },
      {
        name: 'Souk Ahras',
        code: 'DZ-41',
      },
      {
        name: 'Sétif',
        code: 'DZ-19',
      },
      {
        name: 'Tamanghasset',
        code: 'DZ-11',
      },
      {
        name: 'Tiaret',
        code: 'DZ-14',
      },
      {
        name: 'Tindouf',
        code: 'DZ-37',
      },
      {
        name: 'Tipaza',
        code: 'DZ-42',
      },
      {
        name: 'Tissemsilt',
        code: 'DZ-38',
      },
      {
        name: 'Tizi Ouzou',
        code: 'DZ-15',
      },
      {
        name: 'Tlemcen',
        code: 'DZ-13',
      },
      {
        name: 'Tébessa',
        code: 'DZ-12',
      },
    ],
  },
  //   { name: 'American Samoa', code: 'AS' },
  {
    name: 'AndorrA',
    code: 'AD',
    provinces: [
      {
        name: 'Andorra la Vella',
        code: 'AD-07',
      },
      {
        name: 'Canillo',
        code: 'AD-02',
      },
      {
        name: 'Encamp',
        code: 'AD-03',
      },
      {
        name: 'Escaldes-Engordany',
        code: 'AD-08',
      },
      {
        name: 'La Massana',
        code: 'AD-04',
      },
      {
        name: 'Ordino',
        code: 'AD-05',
      },
      {
        name: 'Sant Julià de Lòria',
        code: 'AD-06',
      },
    ],
  },
  {
    name: 'Angola',
    code: 'AO',
    provinces: [
      {
        name: 'Bengo',
        code: 'AO-BGO',
      },
      {
        name: 'Benguela',
        code: 'AO-BGU',
      },
      {
        name: 'Bié',
        code: 'AO-BIE',
      },
      {
        name: 'Cabinda',
        code: 'AO-CAB',
      },
      {
        name: 'Cunene',
        code: 'AO-CNN',
      },
      {
        name: 'Huambo',
        code: 'AO-HUA',
      },
      {
        name: 'Huíla',
        code: 'AO-HUI',
      },
      {
        name: 'Kuando Kubango',
        code: 'AO-CCU',
      },
      {
        name: 'Kwanza Norte',
        code: 'AO-CNO',
      },
      {
        name: 'Kwanza Sul',
        code: 'AO-CUS',
      },
      {
        name: 'Luanda',
        code: 'AO-LUA',
      },
      {
        name: 'Lunda Norte',
        code: 'AO-LNO',
      },
      {
        name: 'Lunda Sul',
        code: 'AO-LSU',
      },
      {
        name: 'Malange',
        code: 'AO-MAL',
      },
      {
        name: 'Moxico',
        code: 'AO-MOX',
      },
      {
        name: 'Namibe',
        code: 'AO-NAM',
      },
      {
        name: 'Uíge',
        code: 'AO-UIG',
      },
      {
        name: 'Zaire',
        code: 'AO-ZAI',
      },
    ],
  },
  //   { name: 'Anguilla', code: 'AI' },
  //   { name: 'Antarctica', code: 'AQ' },
  {
    name: 'Antigua and Barbuda',
    code: 'AG',
    provinces: [
      {
        name: 'Barbuda',
        code: 'AG-10',
      },
      {
        name: 'Redonda',
        code: 'AG-11',
      },
      {
        name: 'Saint George',
        code: 'AG-03',
      },
      {
        name: 'Saint John',
        code: 'AG-04',
      },
      {
        name: 'Saint Mary',
        code: 'AG-05',
      },
      {
        name: 'Saint Paul',
        code: 'AG-06',
      },
      {
        name: 'Saint Peter',
        code: 'AG-07',
      },
      {
        name: 'Saint Philip',
        code: 'AG-08',
      },
    ],
  },
  {
    name: 'Argentina',
    code: 'AR',
    provinces: [
      {
        name: 'Buenos Aires',
        code: 'AR-B',
      },
      {
        name: 'Catamarca',
        code: 'AR-K',
      },
      {
        name: 'Chaco',
        code: 'AR-H',
      },
      {
        name: 'Chubut',
        code: 'AR-U',
      },
      {
        name: 'Ciudad Autónoma de Buenos Aires',
        code: 'AR-C',
      },
      {
        name: 'Corrientes',
        code: 'AR-W',
      },
      {
        name: 'Córdoba',
        code: 'AR-X',
      },
      {
        name: 'Entre Ríos',
        code: 'AR-E',
      },
      {
        name: 'Formosa',
        code: 'AR-P',
      },
      {
        name: 'Jujuy',
        code: 'AR-Y',
      },
      {
        name: 'La Pampa',
        code: 'AR-L',
      },
      {
        name: 'La Rioja',
        code: 'AR-F',
      },
      {
        name: 'Mendoza',
        code: 'AR-M',
      },
      {
        name: 'Misiones',
        code: 'AR-N',
      },
      {
        name: 'Neuquén',
        code: 'AR-Q',
      },
      {
        name: 'Río Negro',
        code: 'AR-R',
      },
      {
        name: 'Salta',
        code: 'AR-A',
      },
      {
        name: 'San Juan',
        code: 'AR-J',
      },
      {
        name: 'San Luis',
        code: 'AR-D',
      },
      {
        name: 'Santa Cruz',
        code: 'AR-Z',
      },
      {
        name: 'Santa Fe',
        code: 'AR-S',
      },
      {
        name: 'Santiago del Estero',
        code: 'AR-G',
      },
      {
        name: 'Tierra del Fuego',
        code: 'AR-V',
      },
      {
        name: 'Tucumán',
        code: 'AR-T',
      },
    ],
  },
  {
    name: 'Armenia',
    code: 'AM',
    provinces: [
      {
        name: 'Aragac̣otn',
        code: 'AM-AG',
      },
      {
        name: 'Ararat',
        code: 'AM-AR',
      },
      {
        name: 'Armavir',
        code: 'AM-AV',
      },
      {
        name: 'Erevan',
        code: 'AM-ER',
      },
      {
        name: "Geġark'unik'",
        code: 'AM-GR',
      },
      {
        name: "Kotayk'",
        code: 'AM-KT',
      },
      {
        name: 'Loṙi',
        code: 'AM-LO',
      },
      {
        name: "Syunik'",
        code: 'AM-SU',
      },
      {
        name: 'Tavuš',
        code: 'AM-TV',
      },
      {
        name: 'Vayoć Jor',
        code: 'AM-VD',
      },
      {
        name: 'Širak',
        code: 'AM-SH',
      },
    ],
  },
  //   { name: 'Aruba', code: 'AW' },
  {
    name: 'Australia',
    code: 'AU',
    provinces: [
      {
        name: 'Australian Capital Territory',
        code: 'AU-ACT',
      },
      {
        name: 'New South Wales',
        code: 'AU-NSW',
      },
      {
        name: 'Northern Territory',
        code: 'AU-NT',
      },
      {
        name: 'Queensland',
        code: 'AU-QLD',
      },
      {
        name: 'South Australia',
        code: 'AU-SA',
      },
      {
        name: 'Tasmania',
        code: 'AU-TAS',
      },
      {
        name: 'Victoria',
        code: 'AU-VIC',
      },
      {
        name: 'Western Australia',
        code: 'AU-WA',
      },
    ],
  },
  {
    name: 'Austria',
    code: 'AT',
    provinces: [
      {
        name: 'Burgenland',
        code: 'AT-1',
      },
      {
        name: 'Kärnten',
        code: 'AT-2',
      },
      {
        name: 'Niederösterreich',
        code: 'AT-3',
      },
      {
        name: 'Oberösterreich',
        code: 'AT-4',
      },
      {
        name: 'Salzburg',
        code: 'AT-5',
      },
      {
        name: 'Steiermark',
        code: 'AT-6',
      },
      {
        name: 'Tirol',
        code: 'AT-7',
      },
      {
        name: 'Vorarlberg',
        code: 'AT-8',
      },
      {
        name: 'Wien',
        code: 'AT-9',
      },
    ],
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
    provinces: [
      {
        name: 'Naxçıvan',
        code: 'AZ-NX',
      },
    ],
  },
  {
    name: 'Bahamas',
    code: 'BS',
    provinces: [
      {
        name: 'Acklins',
        code: 'BS-AK',
      },
      {
        name: 'Berry Islands',
        code: 'BS-BY',
      },
      {
        name: 'Bimini',
        code: 'BS-BI',
      },
      {
        name: 'Black Point',
        code: 'BS-BP',
      },
      {
        name: 'Cat Island',
        code: 'BS-CI',
      },
      {
        name: 'Central Abaco',
        code: 'BS-CO',
      },
      {
        name: 'Central Andros',
        code: 'BS-CS',
      },
      {
        name: 'Central Eleuthera',
        code: 'BS-CE',
      },
      {
        name: 'City of Freeport',
        code: 'BS-FP',
      },
      {
        name: 'Crooked Island and Long Cay',
        code: 'BS-CK',
      },
      {
        name: 'East Grand Bahama',
        code: 'BS-EG',
      },
      {
        name: 'Exuma',
        code: 'BS-EX',
      },
      {
        name: 'Grand Cay',
        code: 'BS-GC',
      },
      {
        name: 'Harbour Island',
        code: 'BS-HI',
      },
      {
        name: 'Hope Town',
        code: 'BS-HT',
      },
      {
        name: 'Inagua',
        code: 'BS-IN',
      },
      {
        name: 'Long Island',
        code: 'BS-LI',
      },
      {
        name: 'Mangrove Cay',
        code: 'BS-MC',
      },
      {
        name: 'Mayaguana',
        code: 'BS-MG',
      },
      {
        name: 'Moores Island',
        code: 'BS-MI',
      },
      {
        name: 'North Abaco',
        code: 'BS-NO',
      },
      {
        name: 'North Andros',
        code: 'BS-NS',
      },
      {
        name: 'North Eleuthera',
        code: 'BS-NE',
      },
      {
        name: 'Ragged Island',
        code: 'BS-RI',
      },
      {
        name: 'Rum Cay',
        code: 'BS-RC',
      },
      {
        name: 'San Salvador',
        code: 'BS-SS',
      },
      {
        name: 'South Abaco',
        code: 'BS-SO',
      },
      {
        name: 'South Andros',
        code: 'BS-SA',
      },
      {
        name: 'South Eleuthera',
        code: 'BS-SE',
      },
      {
        name: 'Spanish Wells',
        code: 'BS-SW',
      },
      {
        name: 'West Grand Bahama',
        code: 'BS-WG',
      },
    ],
  },
  {
    name: 'Bahrain',
    code: 'BH',
    provinces: [
      {
        name: 'Al Janūbīyah',
        code: 'BH-14',
      },
      {
        name: 'Al Manāmah',
        code: 'BH-13',
      },
      {
        name: 'Al Muḩarraq',
        code: 'BH-15',
      },
      {
        name: 'Al Wusţá',
        code: 'BH-16',
      },
      {
        name: 'Ash Shamālīyah',
        code: 'BH-17',
      },
    ],
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    provinces: [
      {
        name: 'Barisal',
        code: 'BD-A',
      },
      {
        name: 'Chittagong',
        code: 'BD-B',
      },
      {
        name: 'Dhaka',
        code: 'BD-C',
      },
      {
        name: 'Khulna',
        code: 'BD-D',
      },
      {
        name: 'Rajshahi',
        code: 'BD-E',
      },
      {
        name: 'Rangpur',
        code: 'BD-F',
      },
      {
        name: 'Sylhet',
        code: 'BD-G',
      },
    ],
  },
  {
    name: 'Barbados',
    code: 'BB',
    provinces: [
      {
        name: 'Christ Church',
        code: 'BB-01',
      },
      {
        name: 'Saint Andrew',
        code: 'BB-02',
      },
      {
        name: 'Saint George',
        code: 'BB-03',
      },
      {
        name: 'Saint James',
        code: 'BB-04',
      },
      {
        name: 'Saint John',
        code: 'BB-05',
      },
      {
        name: 'Saint Joseph',
        code: 'BB-06',
      },
      {
        name: 'Saint Lucy',
        code: 'BB-07',
      },
      {
        name: 'Saint Michael',
        code: 'BB-08',
      },
      {
        name: 'Saint Peter',
        code: 'BB-09',
      },
      {
        name: 'Saint Philip',
        code: 'BB-10',
      },
      {
        name: 'Saint Thomas',
        code: 'BB-11',
      },
    ],
  },
  {
    name: 'Belarus',
    code: 'BY',
    provinces: [
      {
        name: "Brestskaya voblasts'",
        code: 'BY-BR',
      },
      {
        name: "Homyel'skaya voblasts'",
        code: 'BY-HO',
      },
      {
        name: 'Horad Minsk',
        code: 'BY-HM',
      },
      {
        name: "Hrodzenskaya voblasts'",
        code: 'BY-HR',
      },
      {
        name: "Mahilyowskaya voblasts'",
        code: 'BY-MA',
      },
      {
        name: "Minskaya voblasts'",
        code: 'BY-MI',
      },
      {
        name: "Vitsyebskaya voblasts'",
        code: 'BY-VI',
      },
    ],
  },
  {
    name: 'Belgium',
    code: 'BE',
    provinces: [
      {
        name: 'Brussels Hoofdstedelijk Gewest',
        code: 'BE-BRU',
      },
      {
        name: 'Région Wallonne',
        code: 'BE-WAL',
      },
      {
        name: 'Vlaams Gewest',
        code: 'BE-VLG',
      },
    ],
  },
  {
    name: 'Belize',
    code: 'BZ',
    provinces: [
      {
        name: 'Belize',
        code: 'BZ-BZ',
      },
      {
        name: 'Cayo',
        code: 'BZ-CY',
      },
      {
        name: 'Corozal',
        code: 'BZ-CZL',
      },
      {
        name: 'Orange Walk',
        code: 'BZ-OW',
      },
      {
        name: 'Stann Creek',
        code: 'BZ-SC',
      },
      {
        name: 'Toledo',
        code: 'BZ-TOL',
      },
    ],
  },
  {
    name: 'Benin',
    code: 'BJ',
    provinces: [
      {
        name: 'Alibori',
        code: 'BJ-AL',
      },
      {
        name: 'Atakora',
        code: 'BJ-AK',
      },
      {
        name: 'Atlantique',
        code: 'BJ-AQ',
      },
      {
        name: 'Borgou',
        code: 'BJ-BO',
      },
      {
        name: 'Collines',
        code: 'BJ-CO',
      },
      {
        name: 'Donga',
        code: 'BJ-DO',
      },
      {
        name: 'Kouffo',
        code: 'BJ-KO',
      },
      {
        name: 'Littoral',
        code: 'BJ-LI',
      },
      {
        name: 'Mono',
        code: 'BJ-MO',
      },
      {
        name: 'Ouémé',
        code: 'BJ-OU',
      },
      {
        name: 'Plateau',
        code: 'BJ-PL',
      },
      {
        name: 'Zou',
        code: 'BJ-ZO',
      },
    ],
  },
  //   { name: 'Bermuda', code: 'BM' },
  {
    name: 'Bhutan',
    code: 'BT',
    provinces: [
      {
        name: 'Bumthang',
        code: 'BT-33',
      },
      {
        name: 'Chhukha',
        code: 'BT-12',
      },
      {
        name: 'Dagana',
        code: 'BT-22',
      },
      {
        name: 'Gasa',
        code: 'BT-GA',
      },
      {
        name: 'Ha',
        code: 'BT-13',
      },
      {
        name: 'Lhuentse',
        code: 'BT-44',
      },
      {
        name: 'Monggar',
        code: 'BT-42',
      },
      {
        name: 'Paro',
        code: 'BT-11',
      },
      {
        name: 'Pemagatshel',
        code: 'BT-43',
      },
      {
        name: 'Punakha',
        code: 'BT-23',
      },
      {
        name: 'Samdrup Jongkha',
        code: 'BT-45',
      },
      {
        name: 'Samtse',
        code: 'BT-14',
      },
      {
        name: 'Sarpang',
        code: 'BT-31',
      },
      {
        name: 'Thimphu',
        code: 'BT-15',
      },
      {
        name: 'Trashi Yangtse',
        code: 'BT-TY',
      },
      {
        name: 'Trashigang',
        code: 'BT-41',
      },
      {
        name: 'Trongsa',
        code: 'BT-32',
      },
      {
        name: 'Tsirang',
        code: 'BT-21',
      },
      {
        name: 'Wangdue Phodrang',
        code: 'BT-24',
      },
      {
        name: 'Zhemgang',
        code: 'BT-34',
      },
    ],
  },
  {
    name: 'Bolivia',
    code: 'BO',
    provinces: [
      {
        name: 'Chuquisaca',
        code: 'BO-H',
      },
      {
        name: 'Cochabamba',
        code: 'BO-C',
      },
      {
        name: 'El Beni',
        code: 'BO-B',
      },
      {
        name: 'La Paz',
        code: 'BO-L',
      },
      {
        name: 'Oruro',
        code: 'BO-O',
      },
      {
        name: 'Pando',
        code: 'BO-N',
      },
      {
        name: 'Potosí',
        code: 'BO-P',
      },
      {
        name: 'Santa Cruz',
        code: 'BO-S',
      },
      {
        name: 'Tarija',
        code: 'BO-T',
      },
    ],
  },
  {
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    provinces: [
      {
        name: 'Brčko distrikt',
        code: 'BA-BRC',
      },
      {
        name: 'Federacija Bosna i Hercegovina',
        code: 'BA-BIH',
      },
      {
        name: 'Republika Srpska',
        code: 'BA-SRP',
      },
    ],
  },
  {
    name: 'Botswana',
    code: 'BW',
    provinces: [
      {
        name: 'Central',
        code: 'BW-CE',
      },
      {
        name: 'Chobe',
        code: 'BW-CH',
      },
      {
        name: 'Francistown',
        code: 'BW-FR',
      },
      {
        name: 'Gaborone',
        code: 'BW-GA',
      },
      {
        name: 'Ghanzi',
        code: 'BW-GH',
      },
      {
        name: 'Jwaneng',
        code: 'BW-JW',
      },
      {
        name: 'Kgalagadi',
        code: 'BW-KG',
      },
      {
        name: 'Kgatleng',
        code: 'BW-KL',
      },
      {
        name: 'Kweneng',
        code: 'BW-KW',
      },
      {
        name: 'Lobatse',
        code: 'BW-LO',
      },
      {
        name: 'North-East',
        code: 'BW-NE',
      },
      {
        name: 'North-West',
        code: 'BW-NW',
      },
      {
        name: 'Selibe Phikwe',
        code: 'BW-SP',
      },
      {
        name: 'South-East',
        code: 'BW-SE',
      },
      {
        name: 'Southern',
        code: 'BW-SO',
      },
      {
        name: 'Sowa Town',
        code: 'BW-ST',
      },
    ],
  },
  //   { name: 'Bouvet Island', code: 'BV' },
  {
    name: 'Brazil',
    code: 'BR',
    provinces: [
      {
        name: 'Acre',
        code: 'BR-AC',
      },
      {
        name: 'Alagoas',
        code: 'BR-AL',
      },
      {
        name: 'Amapá',
        code: 'BR-AP',
      },
      {
        name: 'Amazonas',
        code: 'BR-AM',
      },
      {
        name: 'Bahia',
        code: 'BR-BA',
      },
      {
        name: 'Ceará',
        code: 'BR-CE',
      },
      {
        name: 'Distrito Federal',
        code: 'BR-DF',
      },
      {
        name: 'Espírito Santo',
        code: 'BR-ES',
      },
      {
        name: 'Goiás',
        code: 'BR-GO',
      },
      {
        name: 'Maranhão',
        code: 'BR-MA',
      },
      {
        name: 'Mato Grosso',
        code: 'BR-MT',
      },
      {
        name: 'Mato Grosso do Sul',
        code: 'BR-MS',
      },
      {
        name: 'Minas Gerais',
        code: 'BR-MG',
      },
      {
        name: 'Paraná',
        code: 'BR-PR',
      },
      {
        name: 'Paraíba',
        code: 'BR-PB',
      },
      {
        name: 'Pará',
        code: 'BR-PA',
      },
      {
        name: 'Pernambuco',
        code: 'BR-PE',
      },
      {
        name: 'Piauí',
        code: 'BR-PI',
      },
      {
        name: 'Rio Grande do Norte',
        code: 'BR-RN',
      },
      {
        name: 'Rio Grande do Sul',
        code: 'BR-RS',
      },
      {
        name: 'Rio de Janeiro',
        code: 'BR-RJ',
      },
      {
        name: 'Rondônia',
        code: 'BR-RO',
      },
      {
        name: 'Roraima',
        code: 'BR-RR',
      },
      {
        name: 'Santa Catarina',
        code: 'BR-SC',
      },
      {
        name: 'Sergipe',
        code: 'BR-SE',
      },
      {
        name: 'São Paulo',
        code: 'BR-SP',
      },
      {
        name: 'Tocantins',
        code: 'BR-TO',
      },
    ],
  },
  //   { name: 'British Indian Ocean Territory', code: 'IO' },
  {
    name: 'Brunei Darussalam',
    code: 'BN',
    provinces: [
      {
        name: 'Belait',
        code: 'BN-BE',
      },
      {
        name: 'Brunei-Muara',
        code: 'BN-BM',
      },
      {
        name: 'Temburong',
        code: 'BN-TE',
      },
      {
        name: 'Tutong',
        code: 'BN-TU',
      },
    ],
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    provinces: [
      {
        name: 'Blagoevgrad',
        code: 'BG-01',
      },
      {
        name: 'Burgas',
        code: 'BG-02',
      },
      {
        name: 'Dobrich',
        code: 'BG-08',
      },
      {
        name: 'Gabrovo',
        code: 'BG-07',
      },
      {
        name: 'Haskovo',
        code: 'BG-26',
      },
      {
        name: 'Kardzhali',
        code: 'BG-09',
      },
      {
        name: 'Kyustendil',
        code: 'BG-10',
      },
      {
        name: 'Lovech',
        code: 'BG-11',
      },
      {
        name: 'Montana',
        code: 'BG-12',
      },
      {
        name: 'Pazardzhik',
        code: 'BG-13',
      },
      {
        name: 'Pernik',
        code: 'BG-14',
      },
      {
        name: 'Pleven',
        code: 'BG-15',
      },
      {
        name: 'Plovdiv',
        code: 'BG-16',
      },
      {
        name: 'Razgrad',
        code: 'BG-17',
      },
      {
        name: 'Ruse',
        code: 'BG-18',
      },
      {
        name: 'Shumen',
        code: 'BG-27',
      },
      {
        name: 'Silistra',
        code: 'BG-19',
      },
      {
        name: 'Sliven',
        code: 'BG-20',
      },
      {
        name: 'Smolyan',
        code: 'BG-21',
      },
      {
        name: 'Sofia',
        code: 'BG-23',
      },
      {
        name: 'Sofia-Grad',
        code: 'BG-22',
      },
      {
        name: 'Stara Zagora',
        code: 'BG-24',
      },
      {
        name: 'Targovishte',
        code: 'BG-25',
      },
      {
        name: 'Varna',
        code: 'BG-03',
      },
      {
        name: 'Veliko Tarnovo',
        code: 'BG-04',
      },
      {
        name: 'Vidin',
        code: 'BG-05',
      },
      {
        name: 'Vratsa',
        code: 'BG-06',
      },
      {
        name: 'Yambol',
        code: 'BG-28',
      },
    ],
  },
  {
    name: 'Burkina Faso',
    code: 'BF',
    provinces: [
      {
        name: 'Boucle du Mouhoun',
        code: 'BF-01',
      },
      {
        name: 'Cascades',
        code: 'BF-02',
      },
      {
        name: 'Centre',
        code: 'BF-03',
      },
      {
        name: 'Centre-Est',
        code: 'BF-04',
      },
      {
        name: 'Centre-Nord',
        code: 'BF-05',
      },
      {
        name: 'Centre-Ouest',
        code: 'BF-06',
      },
      {
        name: 'Centre-Sud',
        code: 'BF-07',
      },
      {
        name: 'Est',
        code: 'BF-08',
      },
      {
        name: 'Hauts-Bassins',
        code: 'BF-09',
      },
      {
        name: 'Nord',
        code: 'BF-10',
      },
      {
        name: 'Plateau-Central',
        code: 'BF-11',
      },
      {
        name: 'Sahel',
        code: 'BF-12',
      },
      {
        name: 'Sud-Ouest',
        code: 'BF-13',
      },
    ],
  },
  {
    name: 'Burundi',
    code: 'BI',
    provinces: [
      {
        name: 'Bubanza',
        code: 'BI-BB',
      },
      {
        name: 'Bujumbura Mairie',
        code: 'BI-BM',
      },
      {
        name: 'Bujumbura Rural',
        code: 'BI-BL',
      },
      {
        name: 'Bururi',
        code: 'BI-BR',
      },
      {
        name: 'Cankuzo',
        code: 'BI-CA',
      },
      {
        name: 'Cibitoke',
        code: 'BI-CI',
      },
      {
        name: 'Gitega',
        code: 'BI-GI',
      },
      {
        name: 'Karuzi',
        code: 'BI-KR',
      },
      {
        name: 'Kayanza',
        code: 'BI-KY',
      },
      {
        name: 'Kirundo',
        code: 'BI-KI',
      },
      {
        name: 'Makamba',
        code: 'BI-MA',
      },
      {
        name: 'Muramvya',
        code: 'BI-MU',
      },
      {
        name: 'Muyinga',
        code: 'BI-MY',
      },
      {
        name: 'Mwaro',
        code: 'BI-MW',
      },
      {
        name: 'Ngozi',
        code: 'BI-NG',
      },
      {
        name: 'Rutana',
        code: 'BI-RT',
      },
      {
        name: 'Ruyigi',
        code: 'BI-RY',
      },
    ],
  },
  {
    name: 'Cambodia',
    code: 'KH',
    provinces: [
      {
        name: 'Baat Dambang',
        code: 'KH-2',
      },
      {
        name: 'Banteay Mean Chey',
        code: 'KH-1',
      },
      {
        name: 'Kampong Chaam',
        code: 'KH-3',
      },
      {
        name: 'Kampong Chhnang',
        code: 'KH-4',
      },
      {
        name: 'Kampong Spueu',
        code: 'KH-5',
      },
      {
        name: 'Kampong Thum',
        code: 'KH-6',
      },
      {
        name: 'Kampot',
        code: 'KH-7',
      },
      {
        name: 'Kandaal',
        code: 'KH-8',
      },
      {
        name: 'Kaoh Kong',
        code: 'KH-9',
      },
      {
        name: 'Kracheh',
        code: 'KH-10',
      },
      {
        name: 'Krong Kaeb',
        code: 'KH-23',
      },
      {
        name: 'Krong Pailin',
        code: 'KH-24',
      },
      {
        name: 'Krong Preah Sihanouk',
        code: 'KH-18',
      },
      {
        name: 'Mondol Kiri',
        code: 'KH-11',
      },
      {
        name: 'Otdar Mean Chey',
        code: 'KH-22',
      },
      {
        name: 'Phnom Penh',
        code: 'KH-12',
      },
      {
        name: 'Pousaat',
        code: 'KH-15',
      },
      {
        name: 'Preah Vihear',
        code: 'KH-13',
      },
      {
        name: 'Prey Veaeng',
        code: 'KH-14',
      },
      {
        name: 'Rotanak Kiri',
        code: 'KH-16',
      },
      {
        name: 'Siem Reab',
        code: 'KH-17',
      },
      {
        name: 'Stueng Traeng',
        code: 'KH-19',
      },
      {
        name: 'Svaay Rieng',
        code: 'KH-20',
      },
      {
        name: 'Taakaev',
        code: 'KH-21',
      },
    ],
  },
  {
    name: 'Cameroon',
    code: 'CM',
    provinces: [
      {
        name: 'Adamaoua',
        code: 'CM-AD',
      },
      {
        name: 'Centre',
        code: 'CM-CE',
      },
      {
        name: 'East',
        code: 'CM-ES',
      },
      {
        name: 'Far North',
        code: 'CM-EN',
      },
      {
        name: 'Littoral',
        code: 'CM-LT',
      },
      {
        name: 'North',
        code: 'CM-NO',
      },
      {
        name: 'North-West',
        code: 'CM-NW',
      },
      {
        name: 'South',
        code: 'CM-SU',
      },
      {
        name: 'South-West',
        code: 'CM-SW',
      },
      {
        name: 'West',
        code: 'CM-OU',
      },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    provinces: [
      {
        name: 'Alberta',
        code: 'CA-AB',
        subdivision: 'province',
        native: 'Alberta',
      },
      {
        name: 'British Columbia',
        code: 'CA-BC',
        subdivision: 'province',
        native: 'Colombie-Britannique',
      },
      {
        name: 'Manitoba',
        code: 'CA-MB',
        subdivision: 'province',
        native: 'Manitoba',
      },
      {
        name: 'New Brunswick',
        code: 'CA-NB',
        subdivision: 'province',
        native: 'Nouveau-Brunswick',
      },
      {
        name: 'Newfoundland and Labrador',
        code: 'CA-NL',
        subdivision: 'province',
        native: 'Terre-Neuve-et-Labrador',
      },
      {
        name: 'Nova Scotia',
        code: 'CA-NS',
        subdivision: 'province',
        native: 'Nouvelle-Écosse',
      },
      {
        name: 'Ontario',
        code: 'CA-ON',
        subdivision: 'province',
        native: 'Ontario',
      },
      {
        name: 'Prince Edward Island',
        code: 'CA-PE',
        subdivision: 'province',
        native: 'Île-du-Prince-Édouard',
      },
      {
        name: 'Quebec',
        code: 'CA-QC',
        subdivision: 'province',
        native: 'Québec',
      },
      {
        name: 'Saskatchewan',
        code: 'CA-SK',
        subdivision: 'province',
        native: 'Saskatchewan',
      },
      {
        name: 'Northwest Territories',
        code: 'CA-NT',
        subdivision: 'territory',
        native: 'Territoires du Nord-Ouest',
      },
      {
        name: 'Nunavut',
        code: 'CA-NU',
        subdivision: 'territory',
        native: 'Nunavut',
      },
      {
        name: 'Yukon',
        code: 'CA-YT',
        subdivision: 'territory',
        native: 'Yukon',
      },
    ],
  },
  {
    name: 'Cape Verde',
    code: 'CV',
    provinces: [
      {
        name: 'Ilhas de Barlavento',
        code: 'CV-B',
      },
      {
        name: 'Ilhas de Sotavento',
        code: 'CV-S',
      },
    ],
  },
  //   { name: 'Cayman Islands', code: 'KY' },
  {
    name: 'Central African Republic',
    code: 'CF',
    provinces: [
      {
        name: 'Bamingui-Bangoran',
        code: 'CF-BB',
      },
      {
        name: 'Bangui',
        code: 'CF-BGF',
      },
      {
        name: 'Basse-Kotto',
        code: 'CF-BK',
      },
      {
        name: 'Gribingui',
        code: 'CF-KB',
      },
      {
        name: 'Haut-Mbomou',
        code: 'CF-HM',
      },
      {
        name: 'Haute-Kotto',
        code: 'CF-HK',
      },
      {
        name: 'Haute-Sangha / Mambéré-Kadéï',
        code: 'CF-HS',
      },
      {
        name: 'Kémo-Gribingui',
        code: 'CF-KG',
      },
      {
        name: 'Lobaye',
        code: 'CF-LB',
      },
      {
        name: 'Mbomou',
        code: 'CF-MB',
      },
      {
        name: 'Nana-Mambéré',
        code: 'CF-NM',
      },
      {
        name: 'Ombella-Mpoko',
        code: 'CF-MP',
      },
      {
        name: 'Ouaka',
        code: 'CF-UK',
      },
      {
        name: 'Ouham',
        code: 'CF-AC',
      },
      {
        name: 'Ouham-Pendé',
        code: 'CF-OP',
      },
      {
        name: 'Sangha',
        code: 'CF-SE',
      },
      {
        name: 'Vakaga',
        code: 'CF-VK',
      },
    ],
  },
  {
    name: 'Chad',
    code: 'TD',
    provinces: [
      {
        name: 'Al Baṭḩah',
        code: 'TD-BA',
      },
      {
        name: 'Al Buḩayrah',
        code: 'TD-LC',
      },
      {
        name: 'Baḩr al Ghazāl',
        code: 'TD-BG',
      },
      {
        name: 'Būrkū',
        code: 'TD-BO',
      },
      {
        name: 'Innīdī',
        code: 'TD-EN',
      },
      {
        name: 'Kānim',
        code: 'TD-KA',
      },
      {
        name: 'Lūqūn al Gharbī',
        code: 'TD-LO',
      },
      {
        name: 'Lūqūn ash Sharqī',
        code: 'TD-LR',
      },
      {
        name: 'Madīnat Injamīnā',
        code: 'TD-ND',
      },
      {
        name: 'Māndūl',
        code: 'TD-MA',
      },
      {
        name: 'Māyū Kībbī al Gharbī',
        code: 'TD-MO',
      },
      {
        name: 'Māyū Kībbī ash Sharqī',
        code: 'TD-ME',
      },
      {
        name: 'Qīrā',
        code: 'TD-GR',
      },
      {
        name: 'Salāmāt',
        code: 'TD-SA',
      },
      {
        name: 'Shārī Bāqirmī',
        code: 'TD-CB',
      },
      {
        name: 'Shārī al Awsaṭ',
        code: 'TD-MC',
      },
      {
        name: 'Sīlā',
        code: 'TD-SI',
      },
      {
        name: 'Tibastī',
        code: 'TD-TI',
      },
      {
        name: 'Tānjilī',
        code: 'TD-TA',
      },
      {
        name: 'Waddāy',
        code: 'TD-OD',
      },
      {
        name: 'Wādī Fīrā',
        code: 'TD-WF',
      },
      {
        name: 'Ḥajjar Lamīs',
        code: 'TD-HL',
      },
    ],
  },
  {
    name: 'Chile',
    code: 'CL',
    provinces: [
      {
        name: 'Aisén del General Carlos Ibañez del Campo',
        code: 'CL-AI',
      },
      {
        name: 'Antofagasta',
        code: 'CL-AN',
      },
      {
        name: 'Araucanía',
        code: 'CL-AR',
      },
      {
        name: 'Arica y Parinacota',
        code: 'CL-AP',
      },
      {
        name: 'Atacama',
        code: 'CL-AT',
      },
      {
        name: 'Bío-Bío',
        code: 'CL-BI',
      },
      {
        name: 'Coquimbo',
        code: 'CL-CO',
      },
      {
        name: "Libertador General Bernardo O'Higgins",
        code: 'CL-LI',
      },
      {
        name: 'Los Lagos',
        code: 'CL-LL',
      },
      {
        name: 'Los Ríos',
        code: 'CL-LR',
      },
      {
        name: 'Magallanes',
        code: 'CL-MA',
      },
      {
        name: 'Maule',
        code: 'CL-ML',
      },
      {
        name: 'Región Metropolitana de Santiago',
        code: 'CL-RM',
      },
      {
        name: 'Tarapacá',
        code: 'CL-TA',
      },
      {
        name: 'Valparaíso',
        code: 'CL-VS',
      },
    ],
  },
  {
    name: 'China',
    code: 'CN',
    provinces: [
      {
        name: 'Guangxi',
        code: 'CN-45',
        subdivision: 'Autonomous region',
        native: '广西',
      },
      {
        name: 'Nei Mongol',
        code: 'CN-15',
        subdivision: 'Autonomous region',
        native: '内蒙古',
      },
      {
        name: 'Ningxia',
        code: 'CN-64',
        subdivision: 'Autonomous region',
        native: '宁夏',
      },
      {
        name: 'Xinjiang',
        code: 'CN-65',
        subdivision: 'Autonomous region',
        native: '新疆',
      },
      {
        name: 'Xizang',
        code: 'CN-54',
        subdivision: 'Autonomous region',
        native: '西藏',
      },
      {
        name: 'Beijing',
        code: 'CN-11',
        subdivision: 'Municipality',
        native: '北京',
      },
      {
        name: 'Chongqing',
        code: 'CN-50',
        subdivision: 'Municipality',
        native: '重庆',
      },
      {
        name: 'Shanghai',
        code: 'CN-31',
        subdivision: 'Municipality',
        native: '上海',
      },
      {
        name: 'Tianjin',
        code: 'CN-12',
        subdivision: 'Municipality',
        native: '天津',
      },
      {
        name: 'Anhui',
        code: 'CN-34',
        subdivision: 'Province',
        native: '安徽',
      },
      {
        name: 'Fujian',
        code: 'CN-35',
        subdivision: 'Province',
        native: '福建',
      },
      {
        name: 'Gansu',
        code: 'CN-62',
        subdivision: 'Province',
        native: '甘肃',
      },
      {
        name: 'Guangdong',
        code: 'CN-44',
        subdivision: 'Province',
        native: '广东',
      },
      {
        name: 'Guizhou',
        code: 'CN-52',
        subdivision: 'Province',
        native: '贵州',
      },
      {
        name: 'Hainan',
        code: 'CN-46',
        subdivision: 'Province',
        native: '海南',
      },
      {
        name: 'Hebei',
        code: 'CN-13',
        subdivision: 'Province',
        native: '河北',
      },
      {
        name: 'Heilongjiang',
        code: 'CN-23',
        subdivision: 'Province',
        native: '黑龙江',
      },
      {
        name: 'Henan',
        code: 'CN-41',
        subdivision: 'Province',
        native: '河南',
      },
      {
        name: 'Hubei',
        code: 'CN-42',
        subdivision: 'Province',
        native: '湖北',
      },
      {
        name: 'Hunan',
        code: 'CN-43',
        subdivision: 'Province',
        native: '湖南',
      },
      {
        name: 'Jiangsu',
        code: 'CN-32',
        subdivision: 'Province',
        native: '江苏',
      },
      {
        name: 'Jiangxi',
        code: 'CN-36',
        subdivision: 'Province',
        native: '江西',
      },
      {
        name: 'Jilin',
        code: 'CN-22',
        subdivision: 'Province',
        native: '吉林',
      },
      {
        name: 'Liaoning',
        code: 'CN-21',
        subdivision: 'Province',
        native: '辽宁',
      },
      {
        name: 'Qinghai',
        code: 'CN-63',
        subdivision: 'Province',
        native: '青海',
      },
      {
        name: 'Shaanxi',
        code: 'CN-61',
        subdivision: 'Province',
        native: '陕西',
      },
      {
        name: 'Shandong',
        code: 'CN-37',
        subdivision: 'Province',
        native: '山东',
      },
      {
        name: 'Shanxi',
        code: 'CN-14',
        subdivision: 'Province',
        native: '山西',
      },
      {
        name: 'Sichuan',
        code: 'CN-51',
        subdivision: 'Province',
        native: '四川',
      },
      {
        name: 'Taiwan',
        code: 'CN-71',
        subdivision: 'Province',
        native: '台湾',
      },
      {
        name: 'Yunnan',
        code: 'CN-53',
        subdivision: 'Province',
        native: '云南',
      },
      {
        name: 'Zhejiang',
        code: 'CN-33',
        subdivision: 'Province',
        native: '浙江',
      },
      {
        name: 'Hong Kong',
        code: 'CN-91',
        subdivision: 'Special administrative region',
        native: '香港',
      },
      {
        name: 'Macao',
        code: 'CN-92',
        subdivision: 'Special administrative region',
        native: '澳门',
      },
    ],
  },
  //   { name: 'Christmas Island', code: 'CX' },
  //   { name: 'Cocos (Keeling) Islands', code: 'CC' },
  {
    name: 'Colombia',
    code: 'CO',
    provinces: [
      {
        name: 'Amazonas',
        code: 'CO-AMA',
      },
      {
        name: 'Antioquia',
        code: 'CO-ANT',
      },
      {
        name: 'Arauca',
        code: 'CO-ARA',
      },
      {
        name: 'Atlántico',
        code: 'CO-ATL',
      },
      {
        name: 'Bolívar',
        code: 'CO-BOL',
      },
      {
        name: 'Boyacá',
        code: 'CO-BOY',
      },
      {
        name: 'Caldas',
        code: 'CO-CAL',
      },
      {
        name: 'Caquetá',
        code: 'CO-CAQ',
      },
      {
        name: 'Casanare',
        code: 'CO-CAS',
      },
      {
        name: 'Cauca',
        code: 'CO-CAU',
      },
      {
        name: 'Cesar',
        code: 'CO-CES',
      },
      {
        name: 'Chocó',
        code: 'CO-CHO',
      },
      {
        name: 'Cundinamarca',
        code: 'CO-CUN',
      },
      {
        name: 'Córdoba',
        code: 'CO-COR',
      },
      {
        name: 'Distrito Capital de Bogotá',
        code: 'CO-DC',
      },
      {
        name: 'Guainía',
        code: 'CO-GUA',
      },
      {
        name: 'Guaviare',
        code: 'CO-GUV',
      },
      {
        name: 'Huila',
        code: 'CO-HUI',
      },
      {
        name: 'La Guajira',
        code: 'CO-LAG',
      },
      {
        name: 'Magdalena',
        code: 'CO-MAG',
      },
      {
        name: 'Meta',
        code: 'CO-MET',
      },
      {
        name: 'Nariño',
        code: 'CO-NAR',
      },
      {
        name: 'Norte de Santander',
        code: 'CO-NSA',
      },
      {
        name: 'Putumayo',
        code: 'CO-PUT',
      },
      {
        name: 'Quindío',
        code: 'CO-QUI',
      },
      {
        name: 'Risaralda',
        code: 'CO-RIS',
      },
      {
        name: 'San Andrés, Providencia y Santa Catalina',
        code: 'CO-SAP',
      },
      {
        name: 'Santander',
        code: 'CO-SAN',
      },
      {
        name: 'Sucre',
        code: 'CO-SUC',
      },
      {
        name: 'Tolima',
        code: 'CO-TOL',
      },
      {
        name: 'Valle del Cauca',
        code: 'CO-VAC',
      },
      {
        name: 'Vaupés',
        code: 'CO-VAU',
      },
      {
        name: 'Vichada',
        code: 'CO-VID',
      },
    ],
  },
  {
    name: 'Comoros',
    code: 'KM',
    provinces: [
      {
        name: 'Anjouan',
        code: 'KM-A',
      },
      {
        name: 'Grande Comore',
        code: 'KM-G',
      },
      {
        name: 'Mohéli',
        code: 'KM-M',
      },
    ],
  },
  {
    name: 'Congo',
    code: 'CG',
    provinces: [
      {
        name: 'Bouenza',
        code: 'CG-11',
      },
      {
        name: 'Brazzaville',
        code: 'CG-BZV',
      },
      {
        name: 'Cuvette',
        code: 'CG-8',
      },
      {
        name: 'Cuvette-Ouest',
        code: 'CG-15',
      },
      {
        name: 'Kouilou',
        code: 'CG-5',
      },
      {
        name: 'Likouala',
        code: 'CG-7',
      },
      {
        name: 'Lékoumou',
        code: 'CG-2',
      },
      {
        name: 'Niari',
        code: 'CG-9',
      },
      {
        name: 'Plateaux',
        code: 'CG-14',
      },
      {
        name: 'Pointe-Noire',
        code: 'CG-16',
      },
      {
        name: 'Pool',
        code: 'CG-12',
      },
      {
        name: 'Sangha',
        code: 'CG-13',
      },
    ],
  },
  {
    name: 'Congo, The Democratic Republic of the',
    code: 'CD',
    provinces: [
      {
        name: 'Bandundu',
        code: 'CD-BN',
      },
      {
        name: 'Bas-Congo',
        code: 'CD-BC',
      },
      {
        name: 'Kasai-Occidental',
        code: 'CD-KW',
      },
      {
        name: 'Kasai-Oriental',
        code: 'CD-KE',
      },
      {
        name: 'Katanga',
        code: 'CD-KA',
      },
      {
        name: 'Kinshasa',
        code: 'CD-KN',
      },
      {
        name: 'Maniema',
        code: 'CD-MA',
      },
      {
        name: 'Nord-Kivu',
        code: 'CD-NK',
      },
      {
        name: 'Orientale',
        code: 'CD-OR',
      },
      {
        name: 'Sud-Kivu',
        code: 'CD-SK',
      },
      {
        name: 'Équateur',
        code: 'CD-EQ',
      },
    ],
  },
  //   { name: 'Cook Islands', code: 'CK' },
  {
    name: 'Costa Rica',
    code: 'CR',
    provinces: [
      {
        name: 'Alajuela',
        code: 'CR-A',
      },
      {
        name: 'Cartago',
        code: 'CR-C',
      },
      {
        name: 'Guanacaste',
        code: 'CR-G',
      },
      {
        name: 'Heredia',
        code: 'CR-H',
      },
      {
        name: 'Limón',
        code: 'CR-L',
      },
      {
        name: 'Puntarenas',
        code: 'CR-P',
      },
      {
        name: 'San José',
        code: 'CR-SJ',
      },
    ],
  },
  {
    name: "Cote D'Ivoire",
    code: 'CI',
    provinces: [
      {
        name: '18 Montagnes',
        code: 'CI-06',
      },
      {
        name: 'Agnébi',
        code: 'CI-16',
      },
      {
        name: 'Bafing',
        code: 'CI-17',
      },
      {
        name: 'Bas-Sassandra',
        code: 'CI-09',
      },
      {
        name: 'Denguélé',
        code: 'CI-10',
      },
      {
        name: 'Fromager',
        code: 'CI-18',
      },
      {
        name: 'Haut-Sassandra',
        code: 'CI-02',
      },
      {
        name: 'Lacs',
        code: 'CI-07',
      },
      {
        name: 'Lagunes',
        code: 'CI-01',
      },
      {
        name: 'Marahoué',
        code: 'CI-12',
      },
      {
        name: 'Moyen-Cavally',
        code: 'CI-19',
      },
      {
        name: 'Moyen-Comoé',
        code: 'CI-05',
      },
      {
        name: 'Nzi-Comoé',
        code: 'CI-11',
      },
      {
        name: 'Savanes',
        code: 'CI-03',
      },
      {
        name: 'Sud-Bandama',
        code: 'CI-15',
      },
      {
        name: 'Sud-Comoé',
        code: 'CI-13',
      },
      {
        name: 'Vallée du Bandama',
        code: 'CI-04',
      },
      {
        name: 'Worodougou',
        code: 'CI-14',
      },
      {
        name: 'Zanzan',
        code: 'CI-08',
      },
    ],
  },
  {
    name: 'Croatia',
    code: 'HR',
    provinces: [
      {
        name: 'Bjelovarsko-bilogorska županija',
        code: 'HR-07',
      },
      {
        name: 'Brodsko-posavska županija',
        code: 'HR-12',
      },
      {
        name: 'Dubrovačko-neretvanska županija',
        code: 'HR-19',
      },
      {
        name: 'Grad Zagreb',
        code: 'HR-21',
      },
      {
        name: 'Istarska županija',
        code: 'HR-18',
      },
      {
        name: 'Karlovačka županija',
        code: 'HR-04',
      },
      {
        name: 'Koprivničko-križevačka županija',
        code: 'HR-06',
      },
      {
        name: 'Krapinsko-zagorska županija',
        code: 'HR-02',
      },
      {
        name: 'Ličko-senjska županija',
        code: 'HR-09',
      },
      {
        name: 'Međimurska županija',
        code: 'HR-20',
      },
      {
        name: 'Osječko-baranjska županija',
        code: 'HR-14',
      },
      {
        name: 'Požeško-slavonska županija',
        code: 'HR-11',
      },
      {
        name: 'Primorsko-goranska županija',
        code: 'HR-08',
      },
      {
        name: 'Sisačko-moslavačka županija',
        code: 'HR-03',
      },
      {
        name: 'Splitsko-dalmatinska županija',
        code: 'HR-17',
      },
      {
        name: 'Varaždinska županija',
        code: 'HR-05',
      },
      {
        name: 'Virovitičko-podravska županija',
        code: 'HR-10',
      },
      {
        name: 'Vukovarsko-srijemska županija',
        code: 'HR-16',
      },
      {
        name: 'Zadarska županija',
        code: 'HR-13',
      },
      {
        name: 'Zagrebačka županija',
        code: 'HR-01',
      },
      {
        name: 'Šibensko-kninska županija',
        code: 'HR-15',
      },
    ],
  },
  {
    name: 'Cuba',
    code: 'CU',
    provinces: [
      {
        name: 'Artemisa',
        code: 'CU-15',
      },
      {
        name: 'Camagüey',
        code: 'CU-09',
      },
      {
        name: 'Ciego de Ávila',
        code: 'CU-08',
      },
      {
        name: 'Cienfuegos',
        code: 'CU-06',
      },
      {
        name: 'Granma',
        code: 'CU-12',
      },
      {
        name: 'Guantánamo',
        code: 'CU-14',
      },
      {
        name: 'Holguín',
        code: 'CU-11',
      },
      {
        name: 'Isla de la Juventud',
        code: 'CU-99',
      },
      {
        name: 'La Habana',
        code: 'CU-03',
      },
      {
        name: 'Las Tunas',
        code: 'CU-10',
      },
      {
        name: 'Matanzas',
        code: 'CU-04',
      },
      {
        name: 'Mayabeque',
        code: 'CU-16',
      },
      {
        name: 'Pinar del Río',
        code: 'CU-01',
      },
      {
        name: 'Sancti Spíritus',
        code: 'CU-07',
      },
      {
        name: 'Santiago de Cuba',
        code: 'CU-13',
      },
      {
        name: 'Villa Clara',
        code: 'CU-05',
      },
    ],
  },
  {
    name: 'Cyprus',
    code: 'CY',
    provinces: [
      {
        name: 'Ammochostos',
        code: 'CY-04',
      },
      {
        name: 'Keryneia',
        code: 'CY-06',
      },
      {
        name: 'Larnaka',
        code: 'CY-03',
      },
      {
        name: 'Lefkosia',
        code: 'CY-01',
      },
      {
        name: 'Lemesos',
        code: 'CY-02',
      },
      {
        name: 'Pafos',
        code: 'CY-05',
      },
    ],
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    provinces: [
      {
        name: 'Jihomoravský kraj',
        code: 'CZ-JM',
      },
      {
        name: 'Jihočeský kraj',
        code: 'CZ-JC',
      },
      {
        name: 'Karlovarský kraj',
        code: 'CZ-KA',
      },
      {
        name: 'Královéhradecký kraj',
        code: 'CZ-KR',
      },
      {
        name: 'Liberecký kraj',
        code: 'CZ-LI',
      },
      {
        name: 'Moravskoslezský kraj',
        code: 'CZ-MO',
      },
      {
        name: 'Olomoucký kraj',
        code: 'CZ-OL',
      },
      {
        name: 'Pardubický kraj',
        code: 'CZ-PA',
      },
      {
        name: 'Plzeňský kraj',
        code: 'CZ-PL',
      },
      {
        name: 'Praha, hlavní město',
        code: 'CZ-PR',
      },
      {
        name: 'Středočeský kraj',
        code: 'CZ-ST',
      },
      {
        name: 'Vysočina',
        code: 'CZ-VY',
      },
      {
        name: 'Zlínský kraj',
        code: 'CZ-ZL',
      },
      {
        name: 'Ústecký kraj',
        code: 'CZ-US',
      },
    ],
  },
  {
    name: 'Denmark',
    code: 'DK',
    provinces: [
      {
        name: 'Hovedstaden',
        code: 'DK-84',
      },
      {
        name: 'Midtjylland',
        code: 'DK-82',
      },
      {
        name: 'Nordjylland',
        code: 'DK-81',
      },
      {
        name: 'Sjælland',
        code: 'DK-85',
      },
      {
        name: 'Syddanmark',
        code: 'DK-83',
      },
    ],
  },
  {
    name: 'Djibouti',
    code: 'DJ',
    provinces: [
      {
        name: 'Ali Sabieh',
        code: 'DJ-AS',
      },
      {
        name: 'Arta',
        code: 'DJ-AR',
      },
      {
        name: 'Dikhil',
        code: 'DJ-DI',
      },
      {
        name: 'Djibouti',
        code: 'DJ-DJ',
      },
      {
        name: 'Obock',
        code: 'DJ-OB',
      },
      {
        name: 'Tadjourah',
        code: 'DJ-TA',
      },
    ],
  },
  {
    name: 'Dominica',
    code: 'DM',
    provinces: [
      {
        name: 'Saint Andrew',
        code: 'DM-02',
      },
      {
        name: 'Saint David',
        code: 'DM-03',
      },
      {
        name: 'Saint George',
        code: 'DM-04',
      },
      {
        name: 'Saint John',
        code: 'DM-05',
      },
      {
        name: 'Saint Joseph',
        code: 'DM-06',
      },
      {
        name: 'Saint Luke',
        code: 'DM-07',
      },
      {
        name: 'Saint Mark',
        code: 'DM-08',
      },
      {
        name: 'Saint Patrick',
        code: 'DM-09',
      },
      {
        name: 'Saint Paul',
        code: 'DM-10',
      },
      {
        name: 'Saint Peter',
        code: 'DM-11',
      },
    ],
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    provinces: [
      {
        name: 'Cibao Nordeste',
        code: 'DO-33',
      },
      {
        name: 'Cibao Noroeste',
        code: 'DO-34',
      },
      {
        name: 'Cibao Norte',
        code: 'DO-35',
      },
      {
        name: 'Cibao Sur',
        code: 'DO-36',
      },
      {
        name: 'El Valle',
        code: 'DO-37',
      },
      {
        name: 'Enriquillo',
        code: 'DO-38',
      },
      {
        name: 'Higuamo',
        code: 'DO-39',
      },
      {
        name: 'Ozama',
        code: 'DO-40',
      },
      {
        name: 'Valdesia',
        code: 'DO-41',
      },
      {
        name: 'Yuma',
        code: 'DO-42',
      },
    ],
  },
  {
    name: 'Ecuador',
    code: 'EC',
    provinces: [
      {
        name: 'Azuay',
        code: 'EC-A',
      },
      {
        name: 'Bolívar',
        code: 'EC-B',
      },
      {
        name: 'Carchi',
        code: 'EC-C',
      },
      {
        name: 'Cañar',
        code: 'EC-F',
      },
      {
        name: 'Chimborazo',
        code: 'EC-H',
      },
      {
        name: 'Cotopaxi',
        code: 'EC-X',
      },
      {
        name: 'El Oro',
        code: 'EC-O',
      },
      {
        name: 'Esmeraldas',
        code: 'EC-E',
      },
      {
        name: 'Galápagos',
        code: 'EC-W',
      },
      {
        name: 'Guayas',
        code: 'EC-G',
      },
      {
        name: 'Imbabura',
        code: 'EC-I',
      },
      {
        name: 'Loja',
        code: 'EC-L',
      },
      {
        name: 'Los Ríos',
        code: 'EC-R',
      },
      {
        name: 'Manabí',
        code: 'EC-M',
      },
      {
        name: 'Morona-Santiago',
        code: 'EC-S',
      },
      {
        name: 'Napo',
        code: 'EC-N',
      },
      {
        name: 'Orellana',
        code: 'EC-D',
      },
      {
        name: 'Pastaza',
        code: 'EC-Y',
      },
      {
        name: 'Pichincha',
        code: 'EC-P',
      },
      {
        name: 'Santa Elena',
        code: 'EC-SE',
      },
      {
        name: 'Santo Domingo de los Tsáchilas',
        code: 'EC-SD',
      },
      {
        name: 'Sucumbíos',
        code: 'EC-U',
      },
      {
        name: 'Tungurahua',
        code: 'EC-T',
      },
      {
        name: 'Zamora-Chinchipe',
        code: 'EC-Z',
      },
    ],
  },
  {
    name: 'Egypt',
    code: 'EG',
    provinces: [
      {
        name: 'Ad Daqahlīyah',
        code: 'EG-DK',
      },
      {
        name: 'Al Baḩr al Aḩmar',
        code: 'EG-BA',
      },
      {
        name: 'Al Buḩayrah',
        code: 'EG-BH',
      },
      {
        name: 'Al Fayyūm',
        code: 'EG-FYM',
      },
      {
        name: 'Al Gharbīyah',
        code: 'EG-GH',
      },
      {
        name: 'Al Iskandarīyah',
        code: 'EG-ALX',
      },
      {
        name: 'Al Ismāٰīlīyah',
        code: 'EG-IS',
      },
      {
        name: 'Al Jīzah',
        code: 'EG-GZ',
      },
      {
        name: 'Al Minyā',
        code: 'EG-MN',
      },
      {
        name: 'Al Minūfīyah',
        code: 'EG-MNF',
      },
      {
        name: 'Al Qalyūbīyah',
        code: 'EG-KB',
      },
      {
        name: 'Al Qāhirah',
        code: 'EG-C',
      },
      {
        name: 'Al Uqşur',
        code: 'EG-LX',
      },
      {
        name: 'Al Wādī al Jadīd',
        code: 'EG-WAD',
      },
      {
        name: 'As Suways',
        code: 'EG-SUZ',
      },
      {
        name: 'As Sādis min Uktūbar',
        code: 'EG-SU',
      },
      {
        name: 'Ash Sharqīyah',
        code: 'EG-SHR',
      },
      {
        name: 'Aswān',
        code: 'EG-ASN',
      },
      {
        name: 'Asyūţ',
        code: 'EG-AST',
      },
      {
        name: 'Banī Suwayf',
        code: 'EG-BNS',
      },
      {
        name: 'Būr Saٰīd',
        code: 'EG-PTS',
      },
      {
        name: 'Dumyāţ',
        code: 'EG-DT',
      },
      {
        name: "Janūb Sīnā'",
        code: 'EG-JS',
      },
      {
        name: 'Kafr ash Shaykh',
        code: 'EG-KFS',
      },
      {
        name: 'Maţrūḩ',
        code: 'EG-MT',
      },
      {
        name: 'Qinā',
        code: 'EG-KN',
      },
      {
        name: "Shamāl Sīnā'",
        code: 'EG-SIN',
      },
      {
        name: 'Sūhāj',
        code: 'EG-SHG',
      },
      {
        name: 'Ḩulwān',
        code: 'EG-HU',
      },
    ],
  },
  {
    name: 'El Salvador',
    code: 'SV',
    provinces: [
      {
        name: 'Ahuachapán',
        code: 'SV-AH',
      },
      {
        name: 'Cabañas',
        code: 'SV-CA',
      },
      {
        name: 'Chalatenango',
        code: 'SV-CH',
      },
      {
        name: 'Cuscatlán',
        code: 'SV-CU',
      },
      {
        name: 'La Libertad',
        code: 'SV-LI',
      },
      {
        name: 'La Paz',
        code: 'SV-PA',
      },
      {
        name: 'La Unión',
        code: 'SV-UN',
      },
      {
        name: 'Morazán',
        code: 'SV-MO',
      },
      {
        name: 'San Miguel',
        code: 'SV-SM',
      },
      {
        name: 'San Salvador',
        code: 'SV-SS',
      },
      {
        name: 'San Vicente',
        code: 'SV-SV',
      },
      {
        name: 'Santa Ana',
        code: 'SV-SA',
      },
      {
        name: 'Sonsonate',
        code: 'SV-SO',
      },
      {
        name: 'Usulután',
        code: 'SV-US',
      },
    ],
  },
  {
    name: 'Equatorial Guinea',
    code: 'GQ',
    provinces: [
      {
        name: 'Región Continental',
        code: 'GQ-C',
      },
      {
        name: 'Región Insular',
        code: 'GQ-I',
      },
    ],
  },
  {
    name: 'Eritrea',
    code: 'ER',
    provinces: [
      {
        name: 'Al Awsaţ',
        code: 'ER-MA',
      },
      {
        name: 'Al Janūbĩ',
        code: 'ER-DU',
      },
      {
        name: 'Ansabā',
        code: 'ER-AN',
      },
      {
        name: 'Janūbī al Baḩrī al Aḩmar',
        code: 'ER-DK',
      },
      {
        name: 'Qāsh-Barkah',
        code: 'ER-GB',
      },
      {
        name: 'Shimālī al Baḩrī al Aḩmar',
        code: 'ER-SK',
      },
    ],
  },
  {
    name: 'Estonia',
    code: 'EE',
    provinces: [
      {
        name: 'Harjumaa',
        code: 'EE-37',
      },
      {
        name: 'Hiiumaa',
        code: 'EE-39',
      },
      {
        name: 'Ida-Virumaa',
        code: 'EE-44',
      },
      {
        name: 'Järvamaa',
        code: 'EE-51',
      },
      {
        name: 'Jõgevamaa',
        code: 'EE-49',
      },
      {
        name: 'Lääne-Virumaa',
        code: 'EE-59',
      },
      {
        name: 'Läänemaa',
        code: 'EE-57',
      },
      {
        name: 'Pärnumaa',
        code: 'EE-67',
      },
      {
        name: 'Põlvamaa',
        code: 'EE-65',
      },
      {
        name: 'Raplamaa',
        code: 'EE-70',
      },
      {
        name: 'Saaremaa',
        code: 'EE-74',
      },
      {
        name: 'Tartumaa',
        code: 'EE-78',
      },
      {
        name: 'Valgamaa',
        code: 'EE-82',
      },
      {
        name: 'Viljandimaa',
        code: 'EE-84',
      },
      {
        name: 'Võrumaa',
        code: 'EE-86',
      },
    ],
  },
  {
    name: 'Ethiopia',
    code: 'ET',
    provinces: [
      {
        name: 'Bīnshangul Gumuz',
        code: 'ET-BE',
      },
      {
        name: 'Dirē Dawa',
        code: 'ET-DD',
      },
      {
        name: 'Gambēla Hizboch',
        code: 'ET-GA',
      },
      {
        name: 'Hārerī Hizb',
        code: 'ET-HA',
      },
      {
        name: 'Oromīya',
        code: 'ET-OR',
      },
      {
        name: 'Sumalē',
        code: 'ET-SO',
      },
      {
        name: 'Tigray',
        code: 'ET-TI',
      },
      {
        name: 'YeDebub Bihēroch Bihēreseboch na Hizboch',
        code: 'ET-SN',
      },
      {
        name: 'Ādīs Ābeba',
        code: 'ET-AA',
      },
      {
        name: 'Āfar',
        code: 'ET-AF',
      },
      {
        name: 'Āmara',
        code: 'ET-AM',
      },
    ],
  },
  //   { name: 'Falkland Islands (Malvinas)', code: 'FK' },
  //   { name: 'Faroe Islands', code: 'FO' },
  {
    name: 'Fiji',
    code: 'FJ',
    provinces: [
      {
        name: 'Central',
        code: 'FJ-C',
      },
      {
        name: 'Eastern',
        code: 'FJ-E',
      },
      {
        name: 'Northern',
        code: 'FJ-N',
      },
      {
        name: 'Rotuma',
        code: 'FJ-R',
      },
      {
        name: 'Western',
        code: 'FJ-W',
      },
    ],
  },
  {
    name: 'Finland',
    code: 'FI',
    provinces: [
      {
        name: 'Ahvenanmaan maakunta',
        code: 'FI-01',
      },
      {
        name: 'Etelä-Karjala',
        code: 'FI-02',
      },
      {
        name: 'Etelä-Pohjanmaa',
        code: 'FI-03',
      },
      {
        name: 'Etelä-Savo',
        code: 'FI-04',
      },
      {
        name: 'Kainuu',
        code: 'FI-05',
      },
      {
        name: 'Kanta-Häme',
        code: 'FI-06',
      },
      {
        name: 'Keski-Pohjanmaa',
        code: 'FI-07',
      },
      {
        name: 'Keski-Suomi',
        code: 'FI-08',
      },
      {
        name: 'Kymenlaakso',
        code: 'FI-09',
      },
      {
        name: 'Lappi',
        code: 'FI-10',
      },
      {
        name: 'Pirkanmaa',
        code: 'FI-11',
      },
      {
        name: 'Pohjanmaa',
        code: 'FI-12',
      },
      {
        name: 'Pohjois-Karjala',
        code: 'FI-13',
      },
      {
        name: 'Pohjois-Pohjanmaa',
        code: 'FI-14',
      },
      {
        name: 'Pohjois-Savo',
        code: 'FI-15',
      },
      {
        name: 'Päijät-Häme',
        code: 'FI-16',
      },
      {
        name: 'Satakunta',
        code: 'FI-17',
      },
      {
        name: 'Uusimaa',
        code: 'FI-18',
      },
      {
        name: 'Varsinais-Suomi',
        code: 'FI-19',
      },
    ],
  },
  {
    name: 'France',
    code: 'FR',
    provinces: [
      {
        name: 'Alsace',
        code: 'FR-A',
        subdivision: 'Metropolitan region',
        native: 'Alsace',
      },
      {
        name: 'Aquitaine',
        code: 'FR-B',
        subdivision: 'Metropolitan region',
        native: 'Aquitaine',
      },
      {
        name: 'Auvergne',
        code: 'FR-C',
        subdivision: 'Metropolitan region',
        native: 'Auvergne',
      },
      {
        name: 'Brittany',
        code: 'FR-E',
        subdivision: 'Metropolitan region',
        native: 'Bretagne',
      },
      {
        name: 'Burgundy',
        code: 'FR-D',
        subdivision: 'Metropolitan region',
        native: 'Bourgogne',
      },
      {
        name: 'Centre-Val de Loire',
        code: 'FR-F',
        subdivision: 'Metropolitan region',
        native: 'Centre',
      },
      {
        name: 'Champagne-Ardenne',
        code: 'FR-G',
        subdivision: 'Metropolitan region',
        native: 'Champagne-Ardenne',
      },
      {
        name: 'Corsica',
        code: 'FR-H',
        subdivision: 'Metropolitan region',
        native: 'Corse',
      },
      {
        name: 'Franche-Comté',
        code: 'FR-I',
        subdivision: 'Metropolitan region',
        native: 'Franche-Comté',
      },
      {
        name: 'Languedoc-Roussillon',
        code: 'FR-K',
        subdivision: 'Metropolitan region',
        native: 'Languedoc-Roussillon',
      },
      {
        name: 'Limousin',
        code: 'FR-L',
        subdivision: 'Metropolitan region',
        native: 'Limousin',
      },
      {
        name: 'Lorraine',
        code: 'FR-M',
        subdivision: 'Metropolitan region',
        native: 'Lorraine',
      },
      {
        name: 'Lower Normandy',
        code: 'FR-P',
        subdivision: 'Metropolitan region',
        native: 'Basse-Normandie',
      },
      {
        name: 'Midi-Pyrénées',
        code: 'FR-N',
        subdivision: 'Metropolitan region',
        native: 'Midi-Pyrénées',
      },
      {
        name: 'Nord-Pas-de-Calais',
        code: 'FR-O',
        subdivision: 'Metropolitan region',
        native: 'Nord-Pas-de-Calais',
      },
      {
        name: 'Pays de la Loire',
        code: 'FR-R',
        subdivision: 'Metropolitan region',
        native: 'Pays de la Loire',
      },
      {
        name: 'Picardy',
        code: 'FR-S',
        subdivision: 'Metropolitan region',
        native: 'Picardie',
      },
      {
        name: 'Poitou-Charentes',
        code: 'FR-T',
        subdivision: 'Metropolitan region',
        native: 'Poitou-Charentes',
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        code: 'FR-U',
        subdivision: 'Metropolitan region',
        native: "Provence-Alpes-Côte d'Azur",
      },
      {
        name: 'Rhône-Alpes',
        code: 'FR-V',
        subdivision: 'Metropolitan region',
        native: 'Rhône-Alpes',
      },
      {
        name: 'Upper Normandy',
        code: 'FR-Q',
        subdivision: 'Metropolitan region',
        native: 'Haute-Normandie',
      },
      {
        name: 'Île-de-France',
        code: 'FR-J',
        subdivision: 'Metropolitan region',
        native: 'Île-de-France',
      },
    ],
  },
  //   { name: 'French Guiana', code: 'GF' },
  //   { name: 'French Polynesia', code: 'PF' },
  //   { name: 'French Southern Territories', code: 'TF' },
  {
    name: 'Gabon',
    code: 'GA',
    provinces: [
      {
        name: 'Estuaire',
        code: 'GA-1',
      },
      {
        name: 'Haut-Ogooué',
        code: 'GA-2',
      },
      {
        name: 'Moyen-Ogooué',
        code: 'GA-3',
      },
      {
        name: 'Ngounié',
        code: 'GA-4',
      },
      {
        name: 'Nyanga',
        code: 'GA-5',
      },
      {
        name: 'Ogooué-Ivindo',
        code: 'GA-6',
      },
      {
        name: 'Ogooué-Lolo',
        code: 'GA-7',
      },
      {
        name: 'Ogooué-Maritime',
        code: 'GA-8',
      },
      {
        name: 'Woleu-Ntem',
        code: 'GA-9',
      },
    ],
  },
  {
    name: 'Gambia',
    code: 'GM',
    provinces: [
      {
        name: 'Banjul',
        code: 'GM-B',
      },
      {
        name: 'Central River',
        code: 'GM-M',
      },
      {
        name: 'Lower River',
        code: 'GM-L',
      },
      {
        name: 'North Bank',
        code: 'GM-N',
      },
      {
        name: 'Upper River',
        code: 'GM-U',
      },
      {
        name: 'Western',
        code: 'GM-W',
      },
    ],
  },
  {
    name: 'Georgia',
    code: 'GE',
    provinces: [
      {
        name: 'Abkhazia',
        code: 'GE-AB',
      },
      {
        name: 'Ajaria',
        code: 'GE-AJ',
      },
      {
        name: 'Guria',
        code: 'GE-GU',
      },
      {
        name: 'Imereti',
        code: 'GE-IM',
      },
      {
        name: "K'akheti",
        code: 'GE-KA',
      },
      {
        name: 'Kvemo Kartli',
        code: 'GE-KK',
      },
      {
        name: 'Mtskheta-Mtianeti',
        code: 'GE-MM',
      },
      {
        name: "Rach'a-Lechkhumi-Kvemo Svaneti",
        code: 'GE-RL',
      },
      {
        name: 'Samegrelo-Zemo Svaneti',
        code: 'GE-SZ',
      },
      {
        name: 'Samtskhe-Javakheti',
        code: 'GE-SJ',
      },
      {
        name: 'Shida Kartli',
        code: 'GE-SK',
      },
      {
        name: 'Tbilisi',
        code: 'GE-TB',
      },
    ],
  },
  {
    name: 'Germany',
    code: 'DE',
    provinces: [
      {
        name: 'Baden-Württemberg',
        code: 'DE-BW',
      },
      {
        name: 'Bayern',
        code: 'DE-BY',
      },
      {
        name: 'Berlin',
        code: 'DE-BE',
      },
      {
        name: 'Brandenburg',
        code: 'DE-BB',
      },
      {
        name: 'Bremen',
        code: 'DE-HB',
      },
      {
        name: 'Hamburg',
        code: 'DE-HH',
      },
      {
        name: 'Hessen',
        code: 'DE-HE',
      },
      {
        name: 'Mecklenburg-Vorpommern',
        code: 'DE-MV',
      },
      {
        name: 'Niedersachsen',
        code: 'DE-NI',
      },
      {
        name: 'Nordrhein-Westfalen',
        code: 'DE-NW',
      },
      {
        name: 'Rheinland-Pfalz',
        code: 'DE-RP',
      },
      {
        name: 'Saarland',
        code: 'DE-SL',
      },
      {
        name: 'Sachsen',
        code: 'DE-SN',
      },
      {
        name: 'Sachsen-Anhalt',
        code: 'DE-ST',
      },
      {
        name: 'Schleswig-Holstein',
        code: 'DE-SH',
      },
      {
        name: 'Thüringen',
        code: 'DE-TH',
      },
    ],
  },
  {
    name: 'Ghana',
    code: 'GH',
    provinces: [
      {
        name: 'Ashanti',
        code: 'GH-AH',
      },
      {
        name: 'Brong-Ahafo',
        code: 'GH-BA',
      },
      {
        name: 'Central',
        code: 'GH-CP',
      },
      {
        name: 'Eastern',
        code: 'GH-EP',
      },
      {
        name: 'Greater Accra',
        code: 'GH-AA',
      },
      {
        name: 'Northern',
        code: 'GH-NP',
      },
      {
        name: 'Upper East',
        code: 'GH-UE',
      },
      {
        name: 'Upper West',
        code: 'GH-UW',
      },
      {
        name: 'Volta',
        code: 'GH-TV',
      },
      {
        name: 'Western',
        code: 'GH-WP',
      },
    ],
  },
  //   { name: 'Gibraltar', code: 'GI' },
  {
    name: 'Greece',
    code: 'GR',
    provinces: [
      {
        name: 'Anatoliki Makedonia kai Thraki',
        code: 'GR-A',
      },
      {
        name: 'Attiki',
        code: 'GR-I',
      },
      {
        name: 'Dytiki Ellada',
        code: 'GR-G',
      },
      {
        name: 'Dytiki Makedonia',
        code: 'GR-C',
      },
      {
        name: 'Ionia Nisia',
        code: 'GR-F',
      },
      {
        name: 'Ipeiros',
        code: 'GR-D',
      },
      {
        name: 'Kentriki Makedonia',
        code: 'GR-B',
      },
      {
        name: 'Kriti',
        code: 'GR-M',
      },
      {
        name: 'Notio Aigaio',
        code: 'GR-L',
      },
      {
        name: 'Peloponnisos',
        code: 'GR-J',
      },
      {
        name: 'Sterea Ellada',
        code: 'GR-H',
      },
      {
        name: 'Thessalia',
        code: 'GR-E',
      },
      {
        name: 'Voreio Aigaio',
        code: 'GR-K',
      },
    ],
  },
  {
    name: 'Greenland',
    code: 'GL',
    provinces: [
      {
        name: 'Kommune Kujalleq',
        code: 'GL-KU',
      },
      {
        name: 'Kommuneqarfik Sermersooq',
        code: 'GL-SM',
      },
      {
        name: 'Qaasuitsup Kommunia',
        code: 'GL-QA',
      },
      {
        name: 'Qeqqata Kommunia',
        code: 'GL-QE',
      },
    ],
  },
  {
    name: 'Grenada',
    code: 'GD',
    provinces: [
      {
        name: 'Saint Andrew',
        code: 'GD-01',
      },
      {
        name: 'Saint David',
        code: 'GD-02',
      },
      {
        name: 'Saint George',
        code: 'GD-03',
      },
      {
        name: 'Saint John',
        code: 'GD-04',
      },
      {
        name: 'Saint Mark',
        code: 'GD-05',
      },
      {
        name: 'Saint Patrick',
        code: 'GD-06',
      },
      {
        name: 'Southern Grenadine Islands',
        code: 'GD-10',
      },
    ],
  },
  //   { name: 'Guadeloupe', code: 'GP' },
  //   { name: 'Guam', code: 'GU' },
  {
    name: 'Guatemala',
    code: 'GT',
    provinces: [
      {
        name: 'Alta Verapaz',
        code: 'GT-AV',
      },
      {
        name: 'Baja Verapaz',
        code: 'GT-BV',
      },
      {
        name: 'Chimaltenango',
        code: 'GT-CM',
      },
      {
        name: 'Chiquimula',
        code: 'GT-CQ',
      },
      {
        name: 'El Progreso',
        code: 'GT-PR',
      },
      {
        name: 'Escuintla',
        code: 'GT-ES',
      },
      {
        name: 'Guatemala',
        code: 'GT-GU',
      },
      {
        name: 'Huehuetenango',
        code: 'GT-HU',
      },
      {
        name: 'Izabal',
        code: 'GT-IZ',
      },
      {
        name: 'Jalapa',
        code: 'GT-JA',
      },
      {
        name: 'Jutiapa',
        code: 'GT-JU',
      },
      {
        name: 'Petén',
        code: 'GT-PE',
      },
      {
        name: 'Quetzaltenango',
        code: 'GT-QZ',
      },
      {
        name: 'Quiché',
        code: 'GT-QC',
      },
      {
        name: 'Retalhuleu',
        code: 'GT-RE',
      },
      {
        name: 'Sacatepéquez',
        code: 'GT-SA',
      },
      {
        name: 'San Marcos',
        code: 'GT-SM',
      },
      {
        name: 'Santa Rosa',
        code: 'GT-SR',
      },
      {
        name: 'Sololá',
        code: 'GT-SO',
      },
      {
        name: 'Suchitepéquez',
        code: 'GT-SU',
      },
      {
        name: 'Totonicapán',
        code: 'GT-TO',
      },
      {
        name: 'Zacapa',
        code: 'GT-ZA',
      },
    ],
  },
  //   { name: 'Guernsey', code: 'GG' },
  {
    name: 'Guinea',
    code: 'GN',
    provinces: [
      {
        name: 'Boké',
        code: 'GN-B',
      },
      {
        name: 'Conakry',
        code: 'GN-C',
      },
      {
        name: 'Faranah',
        code: 'GN-F',
      },
      {
        name: 'Kankan',
        code: 'GN-K',
      },
      {
        name: 'Kindia',
        code: 'GN-D',
      },
      {
        name: 'Labé',
        code: 'GN-L',
      },
      {
        name: 'Mamou',
        code: 'GN-M',
      },
      {
        name: 'Nzérékoré',
        code: 'GN-N',
      },
    ],
  },
  {
    name: 'Guinea-Bissau',
    code: 'GW',
    provinces: [
      {
        name: 'Leste',
        code: 'GW-L',
      },
      {
        name: 'Norte',
        code: 'GW-N',
      },
      {
        name: 'Sul',
        code: 'GW-S',
      },
    ],
  },
  {
    name: 'Guyana',
    code: 'GY',
    provinces: [
      {
        name: 'Barima-Waini',
        code: 'GY-BA',
      },
      {
        name: 'Cuyuni-Mazaruni',
        code: 'GY-CU',
      },
      {
        name: 'Demerara-Mahaica',
        code: 'GY-DE',
      },
      {
        name: 'East Berbice-Corentyne',
        code: 'GY-EB',
      },
      {
        name: 'Essequibo Islands-West Demerara',
        code: 'GY-ES',
      },
      {
        name: 'Mahaica-Berbice',
        code: 'GY-MA',
      },
      {
        name: 'Pomeroon-Supenaam',
        code: 'GY-PM',
      },
      {
        name: 'Potaro-Siparuni',
        code: 'GY-PT',
      },
      {
        name: 'Upper Demerara-Berbice',
        code: 'GY-UD',
      },
      {
        name: 'Upper Takutu-Upper Essequibo',
        code: 'GY-UT',
      },
    ],
  },
  {
    name: 'Haiti',
    code: 'HT',
    provinces: [
      {
        name: 'Artibonite',
        code: 'HT-AR',
      },
      {
        name: 'Centre',
        code: 'HT-CE',
      },
      {
        name: 'Grande-Anse',
        code: 'HT-GA',
      },
      {
        name: 'Nippes',
        code: 'HT-NI',
      },
      {
        name: 'Nord',
        code: 'HT-ND',
      },
      {
        name: 'Nord-Est',
        code: 'HT-NE',
      },
      {
        name: 'Nord-Ouest',
        code: 'HT-NO',
      },
      {
        name: 'Ouest',
        code: 'HT-OU',
      },
      {
        name: 'Sud',
        code: 'HT-SD',
      },
      {
        name: 'Sud-Est',
        code: 'HT-SE',
      },
    ],
  },
  //   { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
  //   { name: 'Holy See (Vatican City State)', code: 'VA' },
  {
    name: 'Honduras',
    code: 'HN',
    provinces: [
      {
        name: 'Atlántida',
        code: 'HN-AT',
      },
      {
        name: 'Choluteca',
        code: 'HN-CH',
      },
      {
        name: 'Colón',
        code: 'HN-CL',
      },
      {
        name: 'Comayagua',
        code: 'HN-CM',
      },
      {
        name: 'Copán',
        code: 'HN-CP',
      },
      {
        name: 'Cortés',
        code: 'HN-CR',
      },
      {
        name: 'El Paraíso',
        code: 'HN-EP',
      },
      {
        name: 'Francisco Morazán',
        code: 'HN-FM',
      },
      {
        name: 'Gracias a Dios',
        code: 'HN-GD',
      },
      {
        name: 'Intibucá',
        code: 'HN-IN',
      },
      {
        name: 'Islas de la Bahía',
        code: 'HN-IB',
      },
      {
        name: 'La Paz',
        code: 'HN-LP',
      },
      {
        name: 'Lempira',
        code: 'HN-LE',
      },
      {
        name: 'Ocotepeque',
        code: 'HN-OC',
      },
      {
        name: 'Olancho',
        code: 'HN-OL',
      },
      {
        name: 'Santa Bárbara',
        code: 'HN-SB',
      },
      {
        name: 'Valle',
        code: 'HN-VA',
      },
      {
        name: 'Yoro',
        code: 'HN-YO',
      },
    ],
  },
  {
    name: 'Hong Kong',
    code: 'HK',
    provinces: [
      { name: 'Hong Kong Island', code: 'HONG KONG' },
      { name: 'Kowloon', code: 'KOWLOON' },
      { name: 'New Territories', code: 'NEW TERRITORIES' },
    ],
  },
  {
    name: 'Hungary',
    code: 'HU',
    provinces: [
      {
        name: 'Baranya',
        code: 'HU-BA',
      },
      {
        name: 'Borsod-Abaúj-Zemplén',
        code: 'HU-BZ',
      },
      {
        name: 'Budapest',
        code: 'HU-BU',
      },
      {
        name: 'Bács-Kiskun',
        code: 'HU-BK',
      },
      {
        name: 'Békés',
        code: 'HU-BE',
      },
      {
        name: 'Békéscsaba',
        code: 'HU-BC',
      },
      {
        name: 'Csongrád',
        code: 'HU-CS',
      },
      {
        name: 'Debrecen',
        code: 'HU-DE',
      },
      {
        name: 'Dunaújváros',
        code: 'HU-DU',
      },
      {
        name: 'Eger',
        code: 'HU-EG',
      },
      {
        name: 'Fejér',
        code: 'HU-FE',
      },
      {
        name: 'Győr',
        code: 'HU-GY',
      },
      {
        name: 'Győr-Moson-Sopron',
        code: 'HU-GS',
      },
      {
        name: 'Hajdú-Bihar',
        code: 'HU-HB',
      },
      {
        name: 'Heves',
        code: 'HU-HE',
      },
      {
        name: 'Hódmezővásárhely',
        code: 'HU-HV',
      },
      {
        name: 'Jász-Nagykun-Szolnok',
        code: 'HU-JN',
      },
      {
        name: 'Kaposvár',
        code: 'HU-KV',
      },
      {
        name: 'Kecskemét',
        code: 'HU-KM',
      },
      {
        name: 'Komárom-Esztergom',
        code: 'HU-KE',
      },
      {
        name: 'Miskolc',
        code: 'HU-MI',
      },
      {
        name: 'Nagykanizsa',
        code: 'HU-NK',
      },
      {
        name: 'Nyíregyháza',
        code: 'HU-NY',
      },
      {
        name: 'Nógrád',
        code: 'HU-NO',
      },
      {
        name: 'Pest',
        code: 'HU-PE',
      },
      {
        name: 'Pécs',
        code: 'HU-PS',
      },
      {
        name: 'Salgótarján',
        code: 'HU-ST',
      },
      {
        name: 'Somogy',
        code: 'HU-SO',
      },
      {
        name: 'Sopron',
        code: 'HU-SN',
      },
      {
        name: 'Szabolcs-Szatmár-Bereg',
        code: 'HU-SZ',
      },
      {
        name: 'Szeged',
        code: 'HU-SD',
      },
      {
        name: 'Szekszárd',
        code: 'HU-SS',
      },
      {
        name: 'Szolnok',
        code: 'HU-SK',
      },
      {
        name: 'Szombathely',
        code: 'HU-SH',
      },
      {
        name: 'Székesfehérvár',
        code: 'HU-SF',
      },
      {
        name: 'Tatabánya',
        code: 'HU-TB',
      },
      {
        name: 'Tolna',
        code: 'HU-TO',
      },
      {
        name: 'Vas',
        code: 'HU-VA',
      },
      {
        name: 'Veszprém',
        code: 'HU-VE',
      },
      {
        name: 'Veszprém',
        code: 'HU-VM',
      },
      {
        name: 'Zala',
        code: 'HU-ZA',
      },
      {
        name: 'Zalaegerszeg',
        code: 'HU-ZE',
      },
      {
        name: 'Érd',
        code: 'HU-ER',
      },
    ],
  },
  {
    name: 'Iceland',
    code: 'IS',
    provinces: [
      {
        name: 'Austurland',
        code: 'IS-7',
      },
      {
        name: 'Höfuðborgarsvæði utan Reykjavíkur',
        code: 'IS-1',
      },
      {
        name: 'Norðurland eystra',
        code: 'IS-6',
      },
      {
        name: 'Norðurland vestra',
        code: 'IS-5',
      },
      {
        name: 'Reykjavík',
        code: 'IS-0',
      },
      {
        name: 'Suðurland',
        code: 'IS-8',
      },
      {
        name: 'Suðurnes',
        code: 'IS-2',
      },
      {
        name: 'Vestfirðir',
        code: 'IS-4',
      },
      {
        name: 'Vesturland',
        code: 'IS-3',
      },
    ],
  },
  {
    name: 'India',
    code: 'IN',
    provinces: [
      {
        name: 'Andaman and Nicobar Islands',
        code: 'IN-AN',
        subdivision: 'Union territory',
      },
      {
        name: 'Chandigarh',
        code: 'IN-CH',
        subdivision: 'Union territory',
      },
      {
        name: 'Dadra and Nagar Haveli',
        code: 'IN-DN',
        subdivision: 'Union territory',
      },
      {
        name: 'Daman and Diu',
        code: 'IN-DD',
        subdivision: 'Union territory',
      },
      {
        name: 'Delhi',
        code: 'IN-DL',
        subdivision: 'Union territory',
      },
      {
        name: 'Lakshadweep',
        code: 'IN-LD',
        subdivision: 'Union territory',
      },
      {
        name: 'Puducherry',
        code: 'IN-PY',
        subdivision: 'Union territory',
      },
      {
        name: 'Andhra Pradesh',
        code: 'IN-AP',
        subdivision: 'state',
      },
      {
        name: 'Arunachal Pradesh',
        code: 'IN-AR',
        subdivision: 'state',
      },
      {
        name: 'Assam',
        code: 'IN-AS',
        subdivision: 'state',
      },
      {
        name: 'Bihar',
        code: 'IN-BR',
        subdivision: 'state',
      },
      {
        name: 'Chhattisgarh',
        code: 'IN-CT',
        subdivision: 'state',
      },
      {
        name: 'Goa',
        code: 'IN-GA',
        subdivision: 'state',
      },
      {
        name: 'Gujarat',
        code: 'IN-GJ',
        subdivision: 'state',
      },
      {
        name: 'Haryana',
        code: 'IN-HR',
        subdivision: 'state',
      },
      {
        name: 'Himachal Pradesh',
        code: 'IN-HP',
        subdivision: 'state',
      },
      {
        name: 'Jammu and Kashmir',
        code: 'IN-JK',
        subdivision: 'state',
      },
      {
        name: 'Jharkhand',
        code: 'IN-JH',
        subdivision: 'state',
      },
      {
        name: 'Karnataka',
        code: 'IN-KA',
        subdivision: 'state',
      },
      {
        name: 'Kerala',
        code: 'IN-KL',
        subdivision: 'state',
      },
      {
        name: 'Madhya Pradesh',
        code: 'IN-MP',
        subdivision: 'state',
      },
      {
        name: 'Maharashtra',
        code: 'IN-MH',
        subdivision: 'state',
      },
      {
        name: 'Manipur',
        code: 'IN-MN',
        subdivision: 'state',
      },
      {
        name: 'Meghalaya',
        code: 'IN-ML',
        subdivision: 'state',
      },
      {
        name: 'Mizoram',
        code: 'IN-MZ',
        subdivision: 'state',
      },
      {
        name: 'Nagaland',
        code: 'IN-NL',
        subdivision: 'state',
      },
      {
        name: 'Odisha',
        code: 'IN-OR',
        subdivision: 'state',
      },
      {
        name: 'Punjab',
        code: 'IN-PB',
        subdivision: 'state',
      },
      {
        name: 'Rajasthan',
        code: 'IN-RJ',
        subdivision: 'state',
      },
      {
        name: 'Sikkim',
        code: 'IN-SK',
        subdivision: 'state',
      },
      {
        name: 'Tamil Nadu',
        code: 'IN-TN',
        subdivision: 'state',
      },
      {
        name: 'Telangana',
        code: 'IN-TG',
        subdivision: 'state',
      },
      {
        name: 'Tripura',
        code: 'IN-TR',
        subdivision: 'state',
      },
      {
        name: 'Uttar Pradesh',
        code: 'IN-UP',
        subdivision: 'state',
      },
      {
        name: 'Uttarakhand',
        code: 'IN-UT',
        subdivision: 'state',
      },
      {
        name: 'West Bengal',
        code: 'IN-WB',
        subdivision: 'state',
      },
    ],
  },
  {
    name: 'Indonesia',
    code: 'ID',
    provinces: [
      {
        name: 'Jawa',
        code: 'ID-JW',
      },
      {
        name: 'Kalimantan',
        code: 'ID-KA',
      },
      {
        name: 'Maluku',
        code: 'ID-ML',
      },
      {
        name: 'Nusa Tenggara',
        code: 'ID-NU',
      },
      {
        name: 'Papua',
        code: 'ID-PP',
      },
      {
        name: 'Sulawesi',
        code: 'ID-SL',
      },
      {
        name: 'Sumatera',
        code: 'ID-SM',
      },
    ],
  },
  {
    name: 'Iran, Islamic Republic Of',
    code: 'IR',
    provinces: [
      {
        name: 'Alborz',
        code: 'IR-32',
      },
      {
        name: 'Ardabīl',
        code: 'IR-03',
      },
      {
        name: 'Būshehr',
        code: 'IR-06',
      },
      {
        name: 'Chahār Maḩāll va Bakhtīārī',
        code: 'IR-08',
      },
      {
        name: 'Eşfahān',
        code: 'IR-04',
      },
      {
        name: 'Fārs',
        code: 'IR-14',
      },
      {
        name: 'Golestān',
        code: 'IR-27',
      },
      {
        name: 'Gīlān',
        code: 'IR-19',
      },
      {
        name: 'Hamadān',
        code: 'IR-24',
      },
      {
        name: 'Hormozgān',
        code: 'IR-23',
      },
      {
        name: 'Kermān',
        code: 'IR-15',
      },
      {
        name: 'Kermānshāh',
        code: 'IR-17',
      },
      {
        name: 'Khorāsān-e Janūbī',
        code: 'IR-29',
      },
      {
        name: 'Khorāsān-e Razavī',
        code: 'IR-30',
      },
      {
        name: 'Khorāsān-e Shemālī',
        code: 'IR-31',
      },
      {
        name: 'Khūzestān',
        code: 'IR-10',
      },
      {
        name: 'Kohgīlūyeh va Būyer Aḩmad',
        code: 'IR-18',
      },
      {
        name: 'Kordestān',
        code: 'IR-16',
      },
      {
        name: 'Lorestān',
        code: 'IR-20',
      },
      {
        name: 'Markazī',
        code: 'IR-22',
      },
      {
        name: 'Māzandarān',
        code: 'IR-21',
      },
      {
        name: 'Qazvīn',
        code: 'IR-28',
      },
      {
        name: 'Qom',
        code: 'IR-26',
      },
      {
        name: 'Semnān',
        code: 'IR-12',
      },
      {
        name: 'Sīstān va Balūchestān',
        code: 'IR-13',
      },
      {
        name: 'Tehrān',
        code: 'IR-07',
      },
      {
        name: 'Yazd',
        code: 'IR-25',
      },
      {
        name: 'Zanjān',
        code: 'IR-11',
      },
      {
        name: 'Āz̄arbāyjān-e Gharbī',
        code: 'IR-02',
      },
      {
        name: 'Āz̄arbāyjān-e Sharqī',
        code: 'IR-01',
      },
      {
        name: 'Īlām',
        code: 'IR-05',
      },
    ],
  },
  {
    name: 'Iraq',
    code: 'IQ',
    provinces: [
      {
        name: 'Al Anbār',
        code: 'IQ-AN',
      },
      {
        name: 'Al Başrah',
        code: 'IQ-BA',
      },
      {
        name: 'Al Muthanná',
        code: 'IQ-MU',
      },
      {
        name: 'Al Qādisīyah',
        code: 'IQ-QA',
      },
      {
        name: 'An Najaf',
        code: 'IQ-NA',
      },
      {
        name: 'Arbīl',
        code: 'IQ-AR',
      },
      {
        name: 'As Sulaymānīyah',
        code: 'IQ-SU',
      },
      {
        name: "At Ta'mīm",
        code: 'IQ-TS',
      },
      {
        name: 'Baghdād',
        code: 'IQ-BG',
      },
      {
        name: 'Bābil',
        code: 'IQ-BB',
      },
      {
        name: 'Dahūk',
        code: 'IQ-DA',
      },
      {
        name: 'Dhī Qār',
        code: 'IQ-DQ',
      },
      {
        name: 'Diyālá',
        code: 'IQ-DI',
      },
      {
        name: "Karbalā'",
        code: 'IQ-KA',
      },
      {
        name: 'Maysān',
        code: 'IQ-MA',
      },
      {
        name: 'Nīnawá',
        code: 'IQ-NI',
      },
      {
        name: 'Wāsiţ',
        code: 'IQ-WA',
      },
      {
        name: 'Şalāḩ ad Dīn',
        code: 'IQ-SD',
      },
    ],
  },
  {
    name: 'Ireland',
    code: 'IE',
    provinces: [
      {
        name: 'Connaught',
        code: 'IE-C',
      },
      {
        name: 'Leinster',
        code: 'IE-L',
      },
      {
        name: 'Munster',
        code: 'IE-M',
      },
      {
        name: 'Ulster',
        code: 'IE-U',
      },
    ],
  },
  //   { name: 'Isle of Man', code: 'IM' },
  {
    name: 'Israel',
    code: 'IL',
    provinces: [
      {
        name: 'HaDarom',
        code: 'IL-D',
      },
      {
        name: 'HaMerkaz',
        code: 'IL-M',
      },
      {
        name: 'HaTsafon',
        code: 'IL-Z',
      },
      {
        name: 'H̱efa',
        code: 'IL-HA',
      },
      {
        name: 'Tel-Aviv',
        code: 'IL-TA',
      },
      {
        name: 'Yerushalayim',
        code: 'IL-JM',
      },
    ],
  },
  {
    name: 'Italy',
    code: 'IT',
    provinces: [
      {
        name: 'Abruzzo',
        code: 'IT-65',
      },
      {
        name: 'Basilicata',
        code: 'IT-77',
      },
      {
        name: 'Calabria',
        code: 'IT-78',
      },
      {
        name: 'Campania',
        code: 'IT-72',
      },
      {
        name: 'Emilia-Romagna',
        code: 'IT-45',
      },
      {
        name: 'Friuli-Venezia Giulia',
        code: 'IT-36',
      },
      {
        name: 'Lazio',
        code: 'IT-62',
      },
      {
        name: 'Liguria',
        code: 'IT-42',
      },
      {
        name: 'Lombardia',
        code: 'IT-25',
      },
      {
        name: 'Marche',
        code: 'IT-57',
      },
      {
        name: 'Molise',
        code: 'IT-67',
      },
      {
        name: 'Piemonte',
        code: 'IT-21',
      },
      {
        name: 'Puglia',
        code: 'IT-75',
      },
      {
        name: 'Sardegna',
        code: 'IT-88',
      },
      {
        name: 'Sicilia',
        code: 'IT-82',
      },
      {
        name: 'Toscana',
        code: 'IT-52',
      },
      {
        name: 'Trentino-Alto Adige',
        code: 'IT-32',
      },
      {
        name: 'Umbria',
        code: 'IT-55',
      },
      {
        name: "Valle d'Aosta",
        code: 'IT-23',
      },
      {
        name: 'Veneto',
        code: 'IT-34',
      },
    ],
  },
  {
    name: 'Jamaica',
    code: 'JM',
    provinces: [
      {
        name: 'Clarendon',
        code: 'JM-13',
      },
      {
        name: 'Hanover',
        code: 'JM-09',
      },
      {
        name: 'Kingston',
        code: 'JM-01',
      },
      {
        name: 'Manchester',
        code: 'JM-12',
      },
      {
        name: 'Portland',
        code: 'JM-04',
      },
      {
        name: 'Saint Andrew',
        code: 'JM-02',
      },
      {
        name: 'Saint Ann',
        code: 'JM-06',
      },
      {
        name: 'Saint Catherine',
        code: 'JM-14',
      },
      {
        name: 'Saint Elizabeth',
        code: 'JM-11',
      },
      {
        name: 'Saint James',
        code: 'JM-08',
      },
      {
        name: 'Saint Mary',
        code: 'JM-05',
      },
      {
        name: 'Saint Thomas',
        code: 'JM-03',
      },
      {
        name: 'Trelawny',
        code: 'JM-07',
      },
      {
        name: 'Westmoreland',
        code: 'JM-10',
      },
    ],
  },
  {
    name: 'Japan',
    code: 'JP',
    provinces: [
      {
        name: 'Aiti',
        code: 'JP-23',
      },
      {
        name: 'Akita',
        code: 'JP-05',
      },
      {
        name: 'Aomori',
        code: 'JP-02',
      },
      {
        name: 'Ehime',
        code: 'JP-38',
      },
      {
        name: 'Gihu',
        code: 'JP-21',
      },
      {
        name: 'Gunma',
        code: 'JP-10',
      },
      {
        name: 'Hirosima',
        code: 'JP-34',
      },
      {
        name: 'Hokkaidô',
        code: 'JP-01',
      },
      {
        name: 'Hukui',
        code: 'JP-18',
      },
      {
        name: 'Hukuoka',
        code: 'JP-40',
      },
      {
        name: 'Hukusima',
        code: 'JP-07',
      },
      {
        name: 'Hyôgo',
        code: 'JP-28',
      },
      {
        name: 'Ibaraki',
        code: 'JP-08',
      },
      {
        name: 'Isikawa',
        code: 'JP-17',
      },
      {
        name: 'Iwate',
        code: 'JP-03',
      },
      {
        name: 'Kagawa',
        code: 'JP-37',
      },
      {
        name: 'Kagosima',
        code: 'JP-46',
      },
      {
        name: 'Kanagawa',
        code: 'JP-14',
      },
      {
        name: 'Kumamoto',
        code: 'JP-43',
      },
      {
        name: 'Kyôto',
        code: 'JP-26',
      },
      {
        name: 'Kôti',
        code: 'JP-39',
      },
      {
        name: 'Mie',
        code: 'JP-24',
      },
      {
        name: 'Miyagi',
        code: 'JP-04',
      },
      {
        name: 'Miyazaki',
        code: 'JP-45',
      },
      {
        name: 'Nagano',
        code: 'JP-20',
      },
      {
        name: 'Nagasaki',
        code: 'JP-42',
      },
      {
        name: 'Nara',
        code: 'JP-29',
      },
      {
        name: 'Niigata',
        code: 'JP-15',
      },
      {
        name: 'Okayama',
        code: 'JP-33',
      },
      {
        name: 'Okinawa',
        code: 'JP-47',
      },
      {
        name: 'Saga',
        code: 'JP-41',
      },
      {
        name: 'Saitama',
        code: 'JP-11',
      },
      {
        name: 'Siga',
        code: 'JP-25',
      },
      {
        name: 'Simane',
        code: 'JP-32',
      },
      {
        name: 'Sizuoka',
        code: 'JP-22',
      },
      {
        name: 'Tiba',
        code: 'JP-12',
      },
      {
        name: 'Tokusima',
        code: 'JP-36',
      },
      {
        name: 'Totigi',
        code: 'JP-09',
      },
      {
        name: 'Tottori',
        code: 'JP-31',
      },
      {
        name: 'Toyama',
        code: 'JP-16',
      },
      {
        name: 'Tôkyô',
        code: 'JP-13',
      },
      {
        name: 'Wakayama',
        code: 'JP-30',
      },
      {
        name: 'Yamagata',
        code: 'JP-06',
      },
      {
        name: 'Yamaguti',
        code: 'JP-35',
      },
      {
        name: 'Yamanasi',
        code: 'JP-19',
      },
      {
        name: 'Ôita',
        code: 'JP-44',
      },
      {
        name: 'Ôsaka',
        code: 'JP-27',
      },
    ],
  },
  //   { name: 'Jersey', code: 'JE' },
  {
    name: 'Jordan',
    code: 'JO',
    provinces: [
      {
        name: "Al Balqā'",
        code: 'JO-BA',
      },
      {
        name: 'Al ʽAqabah',
        code: 'JO-AQ',
      },
      {
        name: "Az Zarqā'",
        code: 'JO-AZ',
      },
      {
        name: 'Aţ Ţafīlah',
        code: 'JO-AT',
      },
      {
        name: 'Irbid',
        code: 'JO-IR',
      },
      {
        name: 'Jerash',
        code: 'JO-JA',
      },
      {
        name: 'Karak',
        code: 'JO-KA',
      },
      {
        name: "Ma'ān",
        code: 'JO-MN',
      },
      {
        name: 'Mafraq',
        code: 'JO-MA',
      },
      {
        name: 'Mādabā',
        code: 'JO-MD',
      },
      {
        name: 'ʽAjlūn',
        code: 'JO-AJ',
      },
      {
        name: '‘Ammān',
        code: 'JO-AM',
      },
    ],
  },
  {
    name: 'Kazakhstan',
    code: 'KZ',
    provinces: [
      {
        name: 'Almaty',
        code: 'KZ-ALA',
      },
      {
        name: 'Almaty oblysy',
        code: 'KZ-ALM',
      },
      {
        name: 'Aqmola oblysy',
        code: 'KZ-AKM',
      },
      {
        name: 'Aqtöbe oblysy',
        code: 'KZ-AKT',
      },
      {
        name: 'Astana',
        code: 'KZ-AST',
      },
      {
        name: 'Atyraū oblysy',
        code: 'KZ-ATY',
      },
      {
        name: 'Batys Qazaqstan oblysy',
        code: 'KZ-ZAP',
      },
      {
        name: 'Mangghystaū oblysy',
        code: 'KZ-MAN',
      },
      {
        name: 'Ongtüstik Qazaqstan oblysy',
        code: 'KZ-YUZ',
      },
      {
        name: 'Pavlodar oblysy',
        code: 'KZ-PAV',
      },
      {
        name: 'Qaraghandy oblysy',
        code: 'KZ-KAR',
      },
      {
        name: 'Qostanay oblysy',
        code: 'KZ-KUS',
      },
      {
        name: 'Qyzylorda oblysy',
        code: 'KZ-KZY',
      },
      {
        name: 'Shyghys Qazaqstan oblysy',
        code: 'KZ-VOS',
      },
      {
        name: 'Soltüstik Qazaqstan oblysy',
        code: 'KZ-SEV',
      },
      {
        name: 'Zhambyl oblysy',
        code: 'KZ-ZHA',
      },
    ],
  },
  {
    name: 'Kenya',
    code: 'KE',
    provinces: [
      {
        name: 'Central',
        code: 'KE-200',
      },
      {
        name: 'Coast',
        code: 'KE-300',
      },
      {
        name: 'Eastern',
        code: 'KE-400',
      },
      {
        name: 'Nairobi',
        code: 'KE-110',
      },
      {
        name: 'North-Eastern',
        code: 'KE-500',
      },
      {
        name: 'Nyanza',
        code: 'KE-600',
      },
      {
        name: 'Rift Valley',
        code: 'KE-700',
      },
      {
        name: 'Western',
        code: 'KE-800',
      },
    ],
  },
  {
    name: 'Kiribati',
    code: 'KI',
    provinces: [
      {
        name: 'Gilbert Islands',
        code: 'KI-G',
      },
      {
        name: 'Line Islands',
        code: 'KI-L',
      },
      {
        name: 'Phoenix Islands',
        code: 'KI-P',
      },
    ],
  },
  {
    name: "Korea, Democratic People'S Republic of",
    code: 'KP',
    provinces: [
      {
        name: 'Chagang',
        code: 'KP-04',
      },
      {
        name: 'Kangwon',
        code: 'KP-07',
      },
      {
        name: 'North Hamgyong',
        code: 'KP-09',
      },
      {
        name: 'North Hwanghae',
        code: 'KP-06',
      },
      {
        name: 'North Pyongan',
        code: 'KP-03',
      },
      {
        name: 'Pyongyang',
        code: 'KP-01',
      },
      {
        name: 'Rason',
        code: 'KP-13',
      },
      {
        name: 'Ryanggang',
        code: 'KP-10',
      },
      {
        name: 'South Hamgyong',
        code: 'KP-08',
      },
      {
        name: 'South Hwanghae',
        code: 'KP-05',
      },
      {
        name: 'South Pyongan',
        code: 'KP-02',
      },
    ],
  },
  {
    name: 'Korea, Republic of',
    code: 'KR',
    provinces: [
      {
        name: 'Busan-gwangyeoksi',
        code: 'KR-26',
      },
      {
        name: 'Chungcheongbuk-do',
        code: 'KR-43',
      },
      {
        name: 'Chungcheongnam-do',
        code: 'KR-44',
      },
      {
        name: 'Daegu-gwangyeoksi',
        code: 'KR-27',
      },
      {
        name: 'Daejeon-gwangyeoksi',
        code: 'KR-30',
      },
      {
        name: 'Gangwon-do',
        code: 'KR-42',
      },
      {
        name: 'Gwangju-gwangyeoksi',
        code: 'KR-29',
      },
      {
        name: 'Gyeonggi-do',
        code: 'KR-41',
      },
      {
        name: 'Gyeongsangbuk-do',
        code: 'KR-47',
      },
      {
        name: 'Gyeongsangnam-do',
        code: 'KR-48',
      },
      {
        name: 'Incheon-gwangyeoksi',
        code: 'KR-28',
      },
      {
        name: 'Jeju-teukbyeoljachido',
        code: 'KR-49',
      },
      {
        name: 'Jeollabuk-do',
        code: 'KR-45',
      },
      {
        name: 'Jeollanam-do',
        code: 'KR-46',
      },
      {
        name: 'Sejong',
        code: 'KR-50',
      },
      {
        name: 'Seoul-teukbyeolsi',
        code: 'KR-11',
      },
      {
        name: 'Ulsan-gwangyeoksi',
        code: 'KR-31',
      },
    ],
  },
  {
    name: 'Kuwait',
    code: 'KW',
    provinces: [
      {
        name: 'Al Aḩmadi',
        code: 'KW-AH',
      },
      {
        name: 'Al Farwānīyah',
        code: 'KW-FA',
      },
      {
        name: 'Al Jahrā’',
        code: 'KW-JA',
      },
      {
        name: 'Al Kuwayt',
        code: 'KW-KU',
      },
      {
        name: 'Mubārak al Kabīr',
        code: 'KW-MU',
      },
      {
        name: 'Ḩawallī',
        code: 'KW-HA',
      },
    ],
  },
  {
    name: 'Kyrgyzstan',
    code: 'KG',
    provinces: [
      {
        name: 'Batken',
        code: 'KG-B',
      },
      {
        name: 'Bishkek',
        code: 'KG-GB',
      },
      {
        name: 'Chü',
        code: 'KG-C',
      },
      {
        name: 'Jalal-Abad',
        code: 'KG-J',
      },
      {
        name: 'Naryn',
        code: 'KG-N',
      },
      {
        name: 'Osh',
        code: 'KG-O',
      },
      {
        name: 'Talas',
        code: 'KG-T',
      },
      {
        name: 'Ysyk-Köl',
        code: 'KG-Y',
      },
    ],
  },
  {
    name: "Lao People'S Democratic Republic",
    code: 'LA',
    provinces: [
      {
        name: 'Attapu',
        code: 'LA-AT',
      },
      {
        name: 'Bokèo',
        code: 'LA-BK',
      },
      {
        name: 'Bolikhamxai',
        code: 'LA-BL',
      },
      {
        name: 'Champasak',
        code: 'LA-CH',
      },
      {
        name: 'Houaphan',
        code: 'LA-HO',
      },
      {
        name: 'Khammouan',
        code: 'LA-KH',
      },
      {
        name: 'Louang Namtha',
        code: 'LA-LM',
      },
      {
        name: 'Louangphabang',
        code: 'LA-LP',
      },
      {
        name: 'Oudômxai',
        code: 'LA-OU',
      },
      {
        name: 'Phôngsali',
        code: 'LA-PH',
      },
      {
        name: 'Salavan',
        code: 'LA-SL',
      },
      {
        name: 'Savannakhét',
        code: 'LA-SV',
      },
      {
        name: 'Vientiane',
        code: 'LA-VT',
      },
      {
        name: 'Vientiane',
        code: 'LA-VI',
      },
      {
        name: 'Xaignabouli',
        code: 'LA-XA',
      },
      {
        name: 'Xaisômboun',
        code: 'LA-XN',
      },
      {
        name: 'Xiangkhoang',
        code: 'LA-XI',
      },
      {
        name: 'Xékong',
        code: 'LA-XE',
      },
    ],
  },
  {
    name: 'Latvia',
    code: 'LV',
    provinces: [
      {
        name: 'Aglonas novads',
        code: 'LV-001',
      },
      {
        name: 'Aizkraukles novads',
        code: 'LV-002',
      },
      {
        name: 'Aizputes novads',
        code: 'LV-003',
      },
      {
        name: 'Aknīstes novads',
        code: 'LV-004',
      },
      {
        name: 'Alojas novads',
        code: 'LV-005',
      },
      {
        name: 'Alsungas novads',
        code: 'LV-006',
      },
      {
        name: 'Alūksnes novads',
        code: 'LV-007',
      },
      {
        name: 'Amatas novads',
        code: 'LV-008',
      },
      {
        name: 'Apes novads',
        code: 'LV-009',
      },
      {
        name: 'Auces novads',
        code: 'LV-010',
      },
      {
        name: 'Babītes novads',
        code: 'LV-012',
      },
      {
        name: 'Baldones novads',
        code: 'LV-013',
      },
      {
        name: 'Baltinavas novads',
        code: 'LV-014',
      },
      {
        name: 'Balvu novads',
        code: 'LV-015',
      },
      {
        name: 'Bauskas novads',
        code: 'LV-016',
      },
      {
        name: 'Beverīnas novads',
        code: 'LV-017',
      },
      {
        name: 'Brocēnu novads',
        code: 'LV-018',
      },
      {
        name: 'Burtnieku novads',
        code: 'LV-019',
      },
      {
        name: 'Carnikavas novads',
        code: 'LV-020',
      },
      {
        name: 'Cesvaines novads',
        code: 'LV-021',
      },
      {
        name: 'Ciblas novads',
        code: 'LV-023',
      },
      {
        name: 'Cēsu novads',
        code: 'LV-022',
      },
      {
        name: 'Dagdas novads',
        code: 'LV-024',
      },
      {
        name: 'Daugavpils',
        code: 'LV-DGV',
      },
      {
        name: 'Daugavpils novads',
        code: 'LV-025',
      },
      {
        name: 'Dobeles novads',
        code: 'LV-026',
      },
      {
        name: 'Dundagas novads',
        code: 'LV-027',
      },
      {
        name: 'Durbes novads',
        code: 'LV-028',
      },
      {
        name: 'Engures novads',
        code: 'LV-029',
      },
      {
        name: 'Garkalnes novads',
        code: 'LV-031',
      },
      {
        name: 'Grobiņas novads',
        code: 'LV-032',
      },
      {
        name: 'Gulbenes novads',
        code: 'LV-033',
      },
      {
        name: 'Iecavas novads',
        code: 'LV-034',
      },
      {
        name: 'Ikšķiles novads',
        code: 'LV-035',
      },
      {
        name: 'Ilūkstes novads',
        code: 'LV-036',
      },
      {
        name: 'Inčukalna novads',
        code: 'LV-037',
      },
      {
        name: 'Jaunjelgavas novads',
        code: 'LV-038',
      },
      {
        name: 'Jaunpiebalgas novads',
        code: 'LV-039',
      },
      {
        name: 'Jaunpils novads',
        code: 'LV-040',
      },
      {
        name: 'Jelgava',
        code: 'LV-JEL',
      },
      {
        name: 'Jelgavas novads',
        code: 'LV-041',
      },
      {
        name: 'Jēkabpils',
        code: 'LV-JKB',
      },
      {
        name: 'Jēkabpils novads',
        code: 'LV-042',
      },
      {
        name: 'Jūrmala',
        code: 'LV-JUR',
      },
      {
        name: 'Kandavas novads',
        code: 'LV-043',
      },
      {
        name: 'Kocēnu novads',
        code: 'LV-045',
      },
      {
        name: 'Kokneses novads',
        code: 'LV-046',
      },
      {
        name: 'Krimuldas novads',
        code: 'LV-048',
      },
      {
        name: 'Krustpils novads',
        code: 'LV-049',
      },
      {
        name: 'Krāslavas novads',
        code: 'LV-047',
      },
      {
        name: 'Kuldīgas novads',
        code: 'LV-050',
      },
      {
        name: 'Kārsavas novads',
        code: 'LV-044',
      },
      {
        name: 'Lielvārdes novads',
        code: 'LV-053',
      },
      {
        name: 'Liepāja',
        code: 'LV-LPX',
      },
      {
        name: 'Limbažu novads',
        code: 'LV-054',
      },
      {
        name: 'Lubānas novads',
        code: 'LV-057',
      },
      {
        name: 'Ludzas novads',
        code: 'LV-058',
      },
      {
        name: 'Līgatnes novads',
        code: 'LV-055',
      },
      {
        name: 'Līvānu novads',
        code: 'LV-056',
      },
      {
        name: 'Madonas novads',
        code: 'LV-059',
      },
      {
        name: 'Mazsalacas novads',
        code: 'LV-060',
      },
      {
        name: 'Mālpils novads',
        code: 'LV-061',
      },
      {
        name: 'Mārupes novads',
        code: 'LV-062',
      },
      {
        name: 'Mērsraga novads',
        code: 'LV-063',
      },
      {
        name: 'Naukšēnu novads',
        code: 'LV-064',
      },
      {
        name: 'Neretas novads',
        code: 'LV-065',
      },
      {
        name: 'Nīcas novads',
        code: 'LV-066',
      },
      {
        name: 'Ogres novads',
        code: 'LV-067',
      },
      {
        name: 'Olaines novads',
        code: 'LV-068',
      },
      {
        name: 'Ozolnieku novads',
        code: 'LV-069',
      },
      {
        name: 'Preiļu novads',
        code: 'LV-073',
      },
      {
        name: 'Priekules novads',
        code: 'LV-074',
      },
      {
        name: 'Priekuļu novads',
        code: 'LV-075',
      },
      {
        name: 'Pārgaujas novads',
        code: 'LV-070',
      },
      {
        name: 'Pāvilostas novads',
        code: 'LV-071',
      },
      {
        name: 'Pļaviņu novads',
        code: 'LV-072',
      },
      {
        name: 'Raunas novads',
        code: 'LV-076',
      },
      {
        name: 'Riebiņu novads',
        code: 'LV-078',
      },
      {
        name: 'Rojas novads',
        code: 'LV-079',
      },
      {
        name: 'Ropažu novads',
        code: 'LV-080',
      },
      {
        name: 'Rucavas novads',
        code: 'LV-081',
      },
      {
        name: 'Rugāju novads',
        code: 'LV-082',
      },
      {
        name: 'Rundāles novads',
        code: 'LV-083',
      },
      {
        name: 'Rēzekne',
        code: 'LV-REZ',
      },
      {
        name: 'Rēzeknes novads',
        code: 'LV-077',
      },
      {
        name: 'Rīga',
        code: 'LV-RIX',
      },
      {
        name: 'Rūjienas novads',
        code: 'LV-084',
      },
      {
        name: 'Salacgrīvas novads',
        code: 'LV-086',
      },
      {
        name: 'Salas novads',
        code: 'LV-085',
      },
      {
        name: 'Salaspils novads',
        code: 'LV-087',
      },
      {
        name: 'Saldus novads',
        code: 'LV-088',
      },
      {
        name: 'Saulkrastu novads',
        code: 'LV-089',
      },
      {
        name: 'Siguldas novads',
        code: 'LV-091',
      },
      {
        name: 'Skrundas novads',
        code: 'LV-093',
      },
      {
        name: 'Skrīveru novads',
        code: 'LV-092',
      },
      {
        name: 'Smiltenes novads',
        code: 'LV-094',
      },
      {
        name: 'Stopiņu novads',
        code: 'LV-095',
      },
      {
        name: 'Strenču novads',
        code: 'LV-096',
      },
      {
        name: 'Sējas novads',
        code: 'LV-090',
      },
      {
        name: 'Talsu novads',
        code: 'LV-097',
      },
      {
        name: 'Tukuma novads',
        code: 'LV-099',
      },
      {
        name: 'Tērvetes novads',
        code: 'LV-098',
      },
      {
        name: 'Vaiņodes novads',
        code: 'LV-100',
      },
      {
        name: 'Valkas novads',
        code: 'LV-101',
      },
      {
        name: 'Valmiera',
        code: 'LV-VMR',
      },
      {
        name: 'Varakļānu novads',
        code: 'LV-102',
      },
      {
        name: 'Vecpiebalgas novads',
        code: 'LV-104',
      },
      {
        name: 'Vecumnieku novads',
        code: 'LV-105',
      },
      {
        name: 'Ventspils',
        code: 'LV-VEN',
      },
      {
        name: 'Ventspils novads',
        code: 'LV-106',
      },
      {
        name: 'Viesītes novads',
        code: 'LV-107',
      },
      {
        name: 'Viļakas novads',
        code: 'LV-108',
      },
      {
        name: 'Viļānu novads',
        code: 'LV-109',
      },
      {
        name: 'Vārkavas novads',
        code: 'LV-103',
      },
      {
        name: 'Zilupes novads',
        code: 'LV-110',
      },
      {
        name: 'Ādažu novads',
        code: 'LV-011',
      },
      {
        name: 'Ērgļu novads',
        code: 'LV-030',
      },
      {
        name: 'Ķeguma novads',
        code: 'LV-051',
      },
      {
        name: 'Ķekavas novads',
        code: 'LV-052',
      },
    ],
  },
  {
    name: 'Lebanon',
    code: 'LB',
    provinces: [
      {
        name: 'Aakkâr',
        code: 'LB-AK',
      },
      {
        name: 'Baalbek-Hermel',
        code: 'LB-BH',
      },
      {
        name: 'Beyrouth',
        code: 'LB-BA',
      },
      {
        name: 'Béqaa',
        code: 'LB-BI',
      },
      {
        name: 'Liban-Nord',
        code: 'LB-AS',
      },
      {
        name: 'Liban-Sud',
        code: 'LB-JA',
      },
      {
        name: 'Mont-Liban',
        code: 'LB-JL',
      },
      {
        name: 'Nabatîyé',
        code: 'LB-NA',
      },
    ],
  },
  {
    name: 'Lesotho',
    code: 'LS',
    provinces: [
      {
        name: 'Berea',
        code: 'LS-D',
      },
      {
        name: 'Butha-Buthe',
        code: 'LS-B',
      },
      {
        name: 'Leribe',
        code: 'LS-C',
      },
      {
        name: 'Mafeteng',
        code: 'LS-E',
      },
      {
        name: 'Maseru',
        code: 'LS-A',
      },
      {
        name: "Mohale's Hoek",
        code: 'LS-F',
      },
      {
        name: 'Mokhotlong',
        code: 'LS-J',
      },
      {
        name: "Qacha's Nek",
        code: 'LS-H',
      },
      {
        name: 'Quthing',
        code: 'LS-G',
      },
      {
        name: 'Thaba-Tseka',
        code: 'LS-K',
      },
    ],
  },
  {
    name: 'Liberia',
    code: 'LR',
    provinces: [
      {
        name: 'Bomi',
        code: 'LR-BM',
      },
      {
        name: 'Bong',
        code: 'LR-BG',
      },
      {
        name: 'Gbarpolu',
        code: 'LR-GP',
      },
      {
        name: 'Grand Bassa',
        code: 'LR-GB',
      },
      {
        name: 'Grand Cape Mount',
        code: 'LR-CM',
      },
      {
        name: 'Grand Gedeh',
        code: 'LR-GG',
      },
      {
        name: 'Grand Kru',
        code: 'LR-GK',
      },
      {
        name: 'Lofa',
        code: 'LR-LO',
      },
      {
        name: 'Margibi',
        code: 'LR-MG',
      },
      {
        name: 'Maryland',
        code: 'LR-MY',
      },
      {
        name: 'Montserrado',
        code: 'LR-MO',
      },
      {
        name: 'Nimba',
        code: 'LR-NI',
      },
      {
        name: 'River Gee',
        code: 'LR-RG',
      },
      {
        name: 'Rivercess',
        code: 'LR-RI',
      },
      {
        name: 'Sinoe',
        code: 'LR-SI',
      },
    ],
  },
  {
    name: 'Libyan Arab Jamahiriya',
    code: 'LY',
    provinces: [
      {
        name: 'Al Buţnān',
        code: 'LY-BU',
      },
      {
        name: 'Al Jabal al Akhḑar',
        code: 'LY-JA',
      },
      {
        name: 'Al Jabal al Gharbī',
        code: 'LY-JG',
      },
      {
        name: 'Al Jifārah',
        code: 'LY-JI',
      },
      {
        name: 'Al Jufrah',
        code: 'LY-JU',
      },
      {
        name: 'Al Kufrah',
        code: 'LY-KF',
      },
      {
        name: 'Al Marj',
        code: 'LY-MJ',
      },
      {
        name: 'Al Marqab',
        code: 'LY-MB',
      },
      {
        name: 'Al Wāḩāt',
        code: 'LY-WA',
      },
      {
        name: 'An Nuqaţ al Khams',
        code: 'LY-NQ',
      },
      {
        name: 'Az Zāwiyah',
        code: 'LY-ZA',
      },
      {
        name: 'Banghāzī',
        code: 'LY-BA',
      },
      {
        name: 'Darnah',
        code: 'LY-DR',
      },
      {
        name: 'Ghāt',
        code: 'LY-GT',
      },
      {
        name: 'Mişrātah',
        code: 'LY-MI',
      },
      {
        name: 'Murzuq',
        code: 'LY-MQ',
      },
      {
        name: 'Nālūt',
        code: 'LY-NL',
      },
      {
        name: 'Sabhā',
        code: 'LY-SB',
      },
      {
        name: 'Surt',
        code: 'LY-SR',
      },
      {
        name: 'Wādī al Ḩayāt',
        code: 'LY-WD',
      },
      {
        name: 'Wādī ash Shāţiʾ',
        code: 'LY-WS',
      },
      {
        name: 'Ţarābulus',
        code: 'LY-TB',
      },
    ],
  },
  {
    name: 'Liechtenstein',
    code: 'LI',
    provinces: [
      {
        name: 'Balzers',
        code: 'LI-01',
      },
      {
        name: 'Eschen',
        code: 'LI-02',
      },
      {
        name: 'Gamprin',
        code: 'LI-03',
      },
      {
        name: 'Mauren',
        code: 'LI-04',
      },
      {
        name: 'Planken',
        code: 'LI-05',
      },
      {
        name: 'Ruggell',
        code: 'LI-06',
      },
      {
        name: 'Schaan',
        code: 'LI-07',
      },
      {
        name: 'Schellenberg',
        code: 'LI-08',
      },
      {
        name: 'Triesen',
        code: 'LI-09',
      },
      {
        name: 'Triesenberg',
        code: 'LI-10',
      },
      {
        name: 'Vaduz',
        code: 'LI-11',
      },
    ],
  },
  {
    name: 'Lithuania',
    code: 'LT',
    provinces: [
      {
        name: 'Alytaus Apskritis',
        code: 'LT-AL',
      },
      {
        name: 'Kauno Apskritis',
        code: 'LT-KU',
      },
      {
        name: 'Klaipėdos Apskritis',
        code: 'LT-KL',
      },
      {
        name: 'Marijampolės Apskritis',
        code: 'LT-MR',
      },
      {
        name: 'Panevėžio Apskritis',
        code: 'LT-PN',
      },
      {
        name: 'Tauragės Apskritis',
        code: 'LT-TA',
      },
      {
        name: 'Telšių Apskritis',
        code: 'LT-TE',
      },
      {
        name: 'Utenos Apskritis',
        code: 'LT-UT',
      },
      {
        name: 'Vilniaus Apskritis',
        code: 'LT-VL',
      },
      {
        name: 'Šiaulių Apskritis',
        code: 'LT-SA',
      },
    ],
  },
  {
    name: 'Luxembourg',
    code: 'LU',
    provinces: [
      {
        name: 'Diekirch',
        code: 'LU-D',
      },
      {
        name: 'Grevenmacher',
        code: 'LU-G',
      },
      {
        name: 'Luxembourg',
        code: 'LU-L',
      },
    ],
  },
  //   { name: 'Macao', code: 'MO' },
  {
    name: 'Macedonia, The Former Yugoslav Republic of',
    code: 'MK',
    provinces: [
      {
        name: 'Aerodrom',
        code: 'MK-01',
      },
      {
        name: 'Aračinovo',
        code: 'MK-02',
      },
      {
        name: 'Berovo',
        code: 'MK-03',
      },
      {
        name: 'Bitola',
        code: 'MK-04',
      },
      {
        name: 'Bogdanci',
        code: 'MK-05',
      },
      {
        name: 'Bogovinje',
        code: 'MK-06',
      },
      {
        name: 'Bosilovo',
        code: 'MK-07',
      },
      {
        name: 'Brvenica',
        code: 'MK-08',
      },
      {
        name: 'Butel',
        code: 'MK-09',
      },
      {
        name: 'Centar',
        code: 'MK-77',
      },
      {
        name: 'Centar Župa',
        code: 'MK-78',
      },
      {
        name: 'Debar',
        code: 'MK-21',
      },
      {
        name: 'Debarca',
        code: 'MK-22',
      },
      {
        name: 'Delčevo',
        code: 'MK-23',
      },
      {
        name: 'Demir Hisar',
        code: 'MK-25',
      },
      {
        name: 'Demir Kapija',
        code: 'MK-24',
      },
      {
        name: 'Dojran',
        code: 'MK-26',
      },
      {
        name: 'Dolneni',
        code: 'MK-27',
      },
      {
        name: 'Drugovo',
        code: 'MK-28',
      },
      {
        name: 'Gazi Baba',
        code: 'MK-17',
      },
      {
        name: 'Gevgelija',
        code: 'MK-18',
      },
      {
        name: 'Gjorče Petrov',
        code: 'MK-29',
      },
      {
        name: 'Gostivar',
        code: 'MK-19',
      },
      {
        name: 'Gradsko',
        code: 'MK-20',
      },
      {
        name: 'Ilinden',
        code: 'MK-34',
      },
      {
        name: 'Jegunovce',
        code: 'MK-35',
      },
      {
        name: 'Karbinci',
        code: 'MK-37',
      },
      {
        name: 'Karpoš',
        code: 'MK-38',
      },
      {
        name: 'Kavadarci',
        code: 'MK-36',
      },
      {
        name: 'Kisela Voda',
        code: 'MK-39',
      },
      {
        name: 'Kičevo',
        code: 'MK-40',
      },
      {
        name: 'Konče',
        code: 'MK-41',
      },
      {
        name: 'Kočani',
        code: 'MK-42',
      },
      {
        name: 'Kratovo',
        code: 'MK-43',
      },
      {
        name: 'Kriva Palanka',
        code: 'MK-44',
      },
      {
        name: 'Krivogaštani',
        code: 'MK-45',
      },
      {
        name: 'Kruševo',
        code: 'MK-46',
      },
      {
        name: 'Kumanovo',
        code: 'MK-47',
      },
      {
        name: 'Lipkovo',
        code: 'MK-48',
      },
      {
        name: 'Lozovo',
        code: 'MK-49',
      },
      {
        name: 'Makedonska Kamenica',
        code: 'MK-51',
      },
      {
        name: 'Makedonski Brod',
        code: 'MK-52',
      },
      {
        name: 'Mavrovo i Rostuša',
        code: 'MK-50',
      },
      {
        name: 'Mogila',
        code: 'MK-53',
      },
      {
        name: 'Negotino',
        code: 'MK-54',
      },
      {
        name: 'Novaci',
        code: 'MK-55',
      },
      {
        name: 'Novo Selo',
        code: 'MK-56',
      },
      {
        name: 'Ohrid',
        code: 'MK-58',
      },
      {
        name: 'Oslomej',
        code: 'MK-57',
      },
      {
        name: 'Pehčevo',
        code: 'MK-60',
      },
      {
        name: 'Petrovec',
        code: 'MK-59',
      },
      {
        name: 'Plasnica',
        code: 'MK-61',
      },
      {
        name: 'Prilep',
        code: 'MK-62',
      },
      {
        name: 'Probištip',
        code: 'MK-63',
      },
      {
        name: 'Radoviš',
        code: 'MK-64',
      },
      {
        name: 'Rankovce',
        code: 'MK-65',
      },
      {
        name: 'Resen',
        code: 'MK-66',
      },
      {
        name: 'Rosoman',
        code: 'MK-67',
      },
      {
        name: 'Saraj',
        code: 'MK-68',
      },
      {
        name: 'Sopište',
        code: 'MK-70',
      },
      {
        name: 'Staro Nagoričane',
        code: 'MK-71',
      },
      {
        name: 'Struga',
        code: 'MK-72',
      },
      {
        name: 'Strumica',
        code: 'MK-73',
      },
      {
        name: 'Studeničani',
        code: 'MK-74',
      },
      {
        name: 'Sveti Nikole',
        code: 'MK-69',
      },
      {
        name: 'Tearce',
        code: 'MK-75',
      },
      {
        name: 'Tetovo',
        code: 'MK-76',
      },
      {
        name: 'Valandovo',
        code: 'MK-10',
      },
      {
        name: 'Vasilevo',
        code: 'MK-11',
      },
      {
        name: 'Veles',
        code: 'MK-13',
      },
      {
        name: 'Vevčani',
        code: 'MK-12',
      },
      {
        name: 'Vinica',
        code: 'MK-14',
      },
      {
        name: 'Vraneštica',
        code: 'MK-15',
      },
      {
        name: 'Vrapčište',
        code: 'MK-16',
      },
      {
        name: 'Zajas',
        code: 'MK-31',
      },
      {
        name: 'Zelenikovo',
        code: 'MK-32',
      },
      {
        name: 'Zrnovci',
        code: 'MK-33',
      },
      {
        name: 'Čair',
        code: 'MK-79',
      },
      {
        name: 'Čaška',
        code: 'MK-80',
      },
      {
        name: 'Češinovo-Obleševo',
        code: 'MK-81',
      },
      {
        name: 'Čučer Sandevo',
        code: 'MK-82',
      },
      {
        name: 'Štip',
        code: 'MK-83',
      },
      {
        name: 'Šuto Orizari',
        code: 'MK-84',
      },
      {
        name: 'Želino',
        code: 'MK-30',
      },
    ],
  },
  {
    name: 'Madagascar',
    code: 'MG',
    provinces: [
      {
        name: 'Antananarivo',
        code: 'MG-T',
      },
      {
        name: 'Antsiranana',
        code: 'MG-D',
      },
      {
        name: 'Fianarantsoa',
        code: 'MG-F',
      },
      {
        name: 'Mahajanga',
        code: 'MG-M',
      },
      {
        name: 'Toamasina',
        code: 'MG-A',
      },
      {
        name: 'Toliara',
        code: 'MG-U',
      },
    ],
  },
  {
    name: 'Malawi',
    code: 'MW',
    provinces: [
      {
        name: 'Central Region',
        code: 'MW-C',
      },
      {
        name: 'Northern Region',
        code: 'MW-N',
      },
      {
        name: 'Southern Region',
        code: 'MW-S',
      },
    ],
  },
  {
    name: 'Malaysia',
    code: 'MY',
    provinces: [
      {
        name: 'Wilayah Persekutuan Kuala Lumpur',
        code: 'MY-14',
        subdivision: 'federal territory',
      },
      {
        name: 'Wilayah Persekutuan Labuan',
        code: 'MY-15',
        subdivision: 'federal territory',
      },
      {
        name: 'Wilayah Persekutuan Putrajaya',
        code: 'MY-16',
        subdivision: 'federal territory',
      },
      {
        name: 'Johor',
        code: 'MY-01',
        subdivision: 'state',
      },
      {
        name: 'Kedah',
        code: 'MY-02',
        subdivision: 'state',
      },
      {
        name: 'Kelantan',
        code: 'MY-03',
        subdivision: 'state',
      },
      {
        name: 'Melaka',
        code: 'MY-04',
        subdivision: 'state',
      },
      {
        name: 'Negeri Sembilan',
        code: 'MY-05',
        subdivision: 'state',
      },
      {
        name: 'Pahang',
        code: 'MY-06',
        subdivision: 'state',
      },
      {
        name: 'Perak',
        code: 'MY-08',
        subdivision: 'state',
      },
      {
        name: 'Perlis',
        code: 'MY-09',
        subdivision: 'state',
      },
      {
        name: 'Pulau Pinang',
        code: 'MY-07',
        subdivision: 'state',
      },
      {
        name: 'Sabah',
        code: 'MY-12',
        subdivision: 'state',
      },
      {
        name: 'Sarawak',
        code: 'MY-13',
        subdivision: 'state',
      },
      {
        name: 'Selangor',
        code: 'MY-10',
        subdivision: 'state',
      },
      {
        name: 'Terengganu',
        code: 'MY-11',
        subdivision: 'state',
      },
    ],
  },
  {
    name: 'Maldives',
    code: 'MV',
    provinces: [
      {
        name: 'Central',
        code: 'MV-CE',
      },
      {
        name: 'Male',
        code: 'MV-MLE',
      },
      {
        name: 'North',
        code: 'MV-NO',
      },
      {
        name: 'North Central',
        code: 'MV-NC',
      },
      {
        name: 'South',
        code: 'MV-SU',
      },
      {
        name: 'South Central',
        code: 'MV-SC',
      },
      {
        name: 'Upper North',
        code: 'MV-UN',
      },
      {
        name: 'Upper South',
        code: 'MV-US',
      },
    ],
  },
  {
    name: 'Mali',
    code: 'ML',
    provinces: [
      {
        name: 'Bamako',
        code: 'ML-BKO',
      },
      {
        name: 'Gao',
        code: 'ML-7',
      },
      {
        name: 'Kayes',
        code: 'ML-1',
      },
      {
        name: 'Kidal',
        code: 'ML-8',
      },
      {
        name: 'Koulikoro',
        code: 'ML-2',
      },
      {
        name: 'Mopti',
        code: 'ML-5',
      },
      {
        name: 'Sikasso',
        code: 'ML-3',
      },
      {
        name: 'Ségou',
        code: 'ML-4',
      },
      {
        name: 'Tombouctou',
        code: 'ML-6',
      },
    ],
  },
  {
    name: 'Malta',
    code: 'MT',
    provinces: [
      {
        name: 'Attard',
        code: 'MT-01',
      },
      {
        name: 'Balzan',
        code: 'MT-02',
      },
      {
        name: 'Birgu',
        code: 'MT-03',
      },
      {
        name: 'Birkirkara',
        code: 'MT-04',
      },
      {
        name: 'Birżebbuġa',
        code: 'MT-05',
      },
      {
        name: 'Bormla',
        code: 'MT-06',
      },
      {
        name: 'Dingli',
        code: 'MT-07',
      },
      {
        name: 'Fgura',
        code: 'MT-08',
      },
      {
        name: 'Floriana',
        code: 'MT-09',
      },
      {
        name: 'Fontana',
        code: 'MT-10',
      },
      {
        name: 'Gudja',
        code: 'MT-11',
      },
      {
        name: 'Għajnsielem',
        code: 'MT-13',
      },
      {
        name: 'Għarb',
        code: 'MT-14',
      },
      {
        name: 'Għargħur',
        code: 'MT-15',
      },
      {
        name: 'Għasri',
        code: 'MT-16',
      },
      {
        name: 'Għaxaq',
        code: 'MT-17',
      },
      {
        name: 'Gżira',
        code: 'MT-12',
      },
      {
        name: 'Iklin',
        code: 'MT-19',
      },
      {
        name: 'Isla',
        code: 'MT-20',
      },
      {
        name: 'Kalkara',
        code: 'MT-21',
      },
      {
        name: 'Kerċem',
        code: 'MT-22',
      },
      {
        name: 'Kirkop',
        code: 'MT-23',
      },
      {
        name: 'Lija',
        code: 'MT-24',
      },
      {
        name: 'Luqa',
        code: 'MT-25',
      },
      {
        name: 'Marsa',
        code: 'MT-26',
      },
      {
        name: 'Marsaskala',
        code: 'MT-27',
      },
      {
        name: 'Marsaxlokk',
        code: 'MT-28',
      },
      {
        name: 'Mdina',
        code: 'MT-29',
      },
      {
        name: 'Mellieħa',
        code: 'MT-30',
      },
      {
        name: 'Mosta',
        code: 'MT-32',
      },
      {
        name: 'Mqabba',
        code: 'MT-33',
      },
      {
        name: 'Msida',
        code: 'MT-34',
      },
      {
        name: 'Mtarfa',
        code: 'MT-35',
      },
      {
        name: 'Munxar',
        code: 'MT-36',
      },
      {
        name: 'Mġarr',
        code: 'MT-31',
      },
      {
        name: 'Nadur',
        code: 'MT-37',
      },
      {
        name: 'Naxxar',
        code: 'MT-38',
      },
      {
        name: 'Paola',
        code: 'MT-39',
      },
      {
        name: 'Pembroke',
        code: 'MT-40',
      },
      {
        name: 'Pietà',
        code: 'MT-41',
      },
      {
        name: 'Qala',
        code: 'MT-42',
      },
      {
        name: 'Qormi',
        code: 'MT-43',
      },
      {
        name: 'Qrendi',
        code: 'MT-44',
      },
      {
        name: 'Rabat Għawdex',
        code: 'MT-45',
      },
      {
        name: 'Rabat Malta',
        code: 'MT-46',
      },
      {
        name: 'Safi',
        code: 'MT-47',
      },
      {
        name: 'San Lawrenz',
        code: 'MT-50',
      },
      {
        name: 'San Pawl il-Baħar',
        code: 'MT-51',
      },
      {
        name: 'San Ġiljan',
        code: 'MT-48',
      },
      {
        name: 'San Ġwann',
        code: 'MT-49',
      },
      {
        name: 'Sannat',
        code: 'MT-52',
      },
      {
        name: 'Santa Luċija',
        code: 'MT-53',
      },
      {
        name: 'Santa Venera',
        code: 'MT-54',
      },
      {
        name: 'Siġġiewi',
        code: 'MT-55',
      },
      {
        name: 'Sliema',
        code: 'MT-56',
      },
      {
        name: 'Swieqi',
        code: 'MT-57',
      },
      {
        name: "Ta' Xbiex",
        code: 'MT-58',
      },
      {
        name: 'Tarxien',
        code: 'MT-59',
      },
      {
        name: 'Valletta',
        code: 'MT-60',
      },
      {
        name: 'Xagħra',
        code: 'MT-61',
      },
      {
        name: 'Xewkija',
        code: 'MT-62',
      },
      {
        name: 'Xgħajra',
        code: 'MT-63',
      },
      {
        name: 'Ħamrun',
        code: 'MT-18',
      },
      {
        name: 'Żabbar',
        code: 'MT-64',
      },
      {
        name: 'Żebbuġ Għawdex',
        code: 'MT-65',
      },
      {
        name: 'Żebbuġ Malta',
        code: 'MT-66',
      },
      {
        name: 'Żejtun',
        code: 'MT-67',
      },
      {
        name: 'Żurrieq',
        code: 'MT-68',
      },
    ],
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
    provinces: [
      {
        name: 'Ralik chain',
        code: 'MH-L',
      },
      {
        name: 'Ratak chain',
        code: 'MH-T',
      },
    ],
  },
  //   { name: 'Martinique', code: 'MQ' },
  {
    name: 'Mauritania',
    code: 'MR',
    provinces: [
      {
        name: 'Adrar',
        code: 'MR-07',
      },
      {
        name: 'Assaba',
        code: 'MR-03',
      },
      {
        name: 'Brakna',
        code: 'MR-05',
      },
      {
        name: 'Dakhlet Nouâdhibou',
        code: 'MR-08',
      },
      {
        name: 'Gorgol',
        code: 'MR-04',
      },
      {
        name: 'Guidimaka',
        code: 'MR-10',
      },
      {
        name: 'Hodh ech Chargui',
        code: 'MR-01',
      },
      {
        name: 'Hodh el Gharbi',
        code: 'MR-02',
      },
      {
        name: 'Inchiri',
        code: 'MR-12',
      },
      {
        name: 'Nouakchott',
        code: 'MR-NKC',
      },
      {
        name: 'Tagant',
        code: 'MR-09',
      },
      {
        name: 'Tiris Zemmour',
        code: 'MR-11',
      },
      {
        name: 'Trarza',
        code: 'MR-06',
      },
    ],
  },
  {
    name: 'Mauritius',
    code: 'MU',
    provinces: [
      {
        name: 'Agalega Islands',
        code: 'MU-AG',
      },
      {
        name: 'Beau Bassin-Rose Hill',
        code: 'MU-BR',
      },
      {
        name: 'Black River',
        code: 'MU-BL',
      },
      {
        name: 'Cargados Carajos Shoals',
        code: 'MU-CC',
      },
      {
        name: 'Curepipe',
        code: 'MU-CU',
      },
      {
        name: 'Flacq',
        code: 'MU-FL',
      },
      {
        name: 'Grand Port',
        code: 'MU-GP',
      },
      {
        name: 'Moka',
        code: 'MU-MO',
      },
      {
        name: 'Pamplemousses',
        code: 'MU-PA',
      },
      {
        name: 'Plaines Wilhems',
        code: 'MU-PW',
      },
      {
        name: 'Port Louis',
        code: 'MU-PL',
      },
      {
        name: 'Port Louis',
        code: 'MU-PU',
      },
      {
        name: 'Quatre Bornes',
        code: 'MU-QB',
      },
      {
        name: 'Rivière du Rempart',
        code: 'MU-RR',
      },
      {
        name: 'Rodrigues Island',
        code: 'MU-RO',
      },
      {
        name: 'Savanne',
        code: 'MU-SA',
      },
      {
        name: 'Vacoas-Phoenix',
        code: 'MU-VP',
      },
    ],
  },
  //   { name: 'Mayotte', code: 'YT' },
  {
    name: 'Mexico',
    code: 'MX',
    provinces: [
      {
        name: 'Distrito Federal',
        code: 'MX-DIF',
        subdivision: 'federal district',
      },
      {
        name: 'Aguascalientes',
        code: 'MX-AGU',
        subdivision: 'state',
      },
      {
        name: 'Baja California',
        code: 'MX-BCN',
        subdivision: 'state',
      },
      {
        name: 'Baja California Sur',
        code: 'MX-BCS',
        subdivision: 'state',
      },
      {
        name: 'Campeche',
        code: 'MX-CAM',
        subdivision: 'state',
      },
      {
        name: 'Chiapas',
        code: 'MX-CHP',
        subdivision: 'state',
      },
      {
        name: 'Chihuahua',
        code: 'MX-CHH',
        subdivision: 'state',
      },
      {
        name: 'Coahuila',
        code: 'MX-COA',
        subdivision: 'state',
      },
      {
        name: 'Colima',
        code: 'MX-COL',
        subdivision: 'state',
      },
      {
        name: 'Durango',
        code: 'MX-DUR',
        subdivision: 'state',
      },
      {
        name: 'Guanajuato',
        code: 'MX-GUA',
        subdivision: 'state',
      },
      {
        name: 'Guerrero',
        code: 'MX-GRO',
        subdivision: 'state',
      },
      {
        name: 'Hidalgo',
        code: 'MX-HID',
        subdivision: 'state',
      },
      {
        name: 'Jalisco',
        code: 'MX-JAL',
        subdivision: 'state',
      },
      {
        name: 'Michoacán',
        code: 'MX-MIC',
        subdivision: 'state',
      },
      {
        name: 'Morelos',
        code: 'MX-MOR',
        subdivision: 'state',
      },
      {
        name: 'México',
        code: 'MX-MEX',
        subdivision: 'state',
      },
      {
        name: 'Nayarit',
        code: 'MX-NAY',
        subdivision: 'state',
      },
      {
        name: 'Nuevo León',
        code: 'MX-NLE',
        subdivision: 'state',
      },
      {
        name: 'Oaxaca',
        code: 'MX-OAX',
        subdivision: 'state',
      },
      {
        name: 'Puebla',
        code: 'MX-PUE',
        subdivision: 'state',
      },
      {
        name: 'Querétaro',
        code: 'MX-QUE',
        subdivision: 'state',
      },
      {
        name: 'Quintana Roo',
        code: 'MX-ROO',
        subdivision: 'state',
      },
      {
        name: 'San Luis Potosí',
        code: 'MX-SLP',
        subdivision: 'state',
      },
      {
        name: 'Sinaloa',
        code: 'MX-SIN',
        subdivision: 'state',
      },
      {
        name: 'Sonora',
        code: 'MX-SON',
        subdivision: 'state',
      },
      {
        name: 'Tabasco',
        code: 'MX-TAB',
        subdivision: 'state',
      },
      {
        name: 'Tamaulipas',
        code: 'MX-TAM',
        subdivision: 'state',
      },
      {
        name: 'Tlaxcala',
        code: 'MX-TLA',
        subdivision: 'state',
      },
      {
        name: 'Veracruz',
        code: 'MX-VER',
        subdivision: 'state',
      },
      {
        name: 'Yucatán',
        code: 'MX-YUC',
        subdivision: 'state',
      },
      {
        name: 'Zacatecas',
        code: 'MX-ZAC',
        subdivision: 'state',
      },
    ],
  },
  {
    name: 'Micronesia, Federated States of',
    code: 'FM',
    provinces: [
      {
        name: 'Chuuk',
        code: 'FM-TRK',
      },
      {
        name: 'Kosrae',
        code: 'FM-KSA',
      },
      {
        name: 'Pohnpei',
        code: 'FM-PNI',
      },
      {
        name: 'Yap',
        code: 'FM-YAP',
      },
    ],
  },
  {
    name: 'Moldova, Republic of',
    code: 'MD',
    provinces: [
      {
        name: 'Anenii Noi',
        code: 'MD-AN',
      },
      {
        name: 'Basarabeasca',
        code: 'MD-BS',
      },
      {
        name: 'Briceni',
        code: 'MD-BR',
      },
      {
        name: 'Bălţi',
        code: 'MD-BA',
      },
      {
        name: 'Cahul',
        code: 'MD-CA',
      },
      {
        name: 'Cantemir',
        code: 'MD-CT',
      },
      {
        name: 'Chişinău',
        code: 'MD-CU',
      },
      {
        name: 'Cimişlia',
        code: 'MD-CM',
      },
      {
        name: 'Criuleni',
        code: 'MD-CR',
      },
      {
        name: 'Călăraşi',
        code: 'MD-CL',
      },
      {
        name: 'Căuşeni',
        code: 'MD-CS',
      },
      {
        name: 'Donduşeni',
        code: 'MD-DO',
      },
      {
        name: 'Drochia',
        code: 'MD-DR',
      },
      {
        name: 'Dubăsari',
        code: 'MD-DU',
      },
      {
        name: 'Edineţ',
        code: 'MD-ED',
      },
      {
        name: 'Floreşti',
        code: 'MD-FL',
      },
      {
        name: 'Făleşti',
        code: 'MD-FA',
      },
      {
        name: 'Glodeni',
        code: 'MD-GL',
      },
      {
        name: 'Găgăuzia, Unitatea teritorială autonomă',
        code: 'MD-GA',
      },
      {
        name: 'Hînceşti',
        code: 'MD-HI',
      },
      {
        name: 'Ialoveni',
        code: 'MD-IA',
      },
      {
        name: 'Leova',
        code: 'MD-LE',
      },
      {
        name: 'Nisporeni',
        code: 'MD-NI',
      },
      {
        name: 'Ocniţa',
        code: 'MD-OC',
      },
      {
        name: 'Orhei',
        code: 'MD-OR',
      },
      {
        name: 'Rezina',
        code: 'MD-RE',
      },
      {
        name: 'Rîşcani',
        code: 'MD-RI',
      },
      {
        name: 'Soroca',
        code: 'MD-SO',
      },
      {
        name: 'Străşeni',
        code: 'MD-ST',
      },
      {
        name: 'Stînga Nistrului, unitatea teritorială din',
        code: 'MD-SN',
      },
      {
        name: 'Sîngerei',
        code: 'MD-SI',
      },
      {
        name: 'Taraclia',
        code: 'MD-TA',
      },
      {
        name: 'Teleneşti',
        code: 'MD-TE',
      },
      {
        name: 'Tighina',
        code: 'MD-BD',
      },
      {
        name: 'Ungheni',
        code: 'MD-UN',
      },
      {
        name: 'Şoldăneşti',
        code: 'MD-SD',
      },
      {
        name: 'Ştefan Vodă',
        code: 'MD-SV',
      },
    ],
  },
  {
    name: 'Monaco',
    code: 'MC',
    provinces: [
      {
        name: 'Fontvieille',
        code: 'MC-FO',
      },
      {
        name: 'Jardin Exotique',
        code: 'MC-JE',
      },
      {
        name: 'La Colle',
        code: 'MC-CL',
      },
      {
        name: 'La Condamine',
        code: 'MC-CO',
      },
      {
        name: 'La Gare',
        code: 'MC-GA',
      },
      {
        name: 'La Source',
        code: 'MC-SO',
      },
      {
        name: 'Larvotto',
        code: 'MC-LA',
      },
      {
        name: 'Malbousquet',
        code: 'MC-MA',
      },
      {
        name: 'Monaco-Ville',
        code: 'MC-MO',
      },
      {
        name: 'Moneghetti',
        code: 'MC-MG',
      },
      {
        name: 'Monte-Carlo',
        code: 'MC-MC',
      },
      {
        name: 'Moulins',
        code: 'MC-MU',
      },
      {
        name: 'Port-Hercule',
        code: 'MC-PH',
      },
      {
        name: 'Saint-Roman',
        code: 'MC-SR',
      },
      {
        name: 'Sainte-Dévote',
        code: 'MC-SD',
      },
      {
        name: 'Spélugues',
        code: 'MC-SP',
      },
      {
        name: 'Vallon de la Rousse',
        code: 'MC-VR',
      },
    ],
  },
  {
    name: 'Mongolia',
    code: 'MN',
    provinces: [
      {
        name: 'Arhangay',
        code: 'MN-073',
      },
      {
        name: 'Bayan-Ölgiy',
        code: 'MN-071',
      },
      {
        name: 'Bayanhongor',
        code: 'MN-069',
      },
      {
        name: 'Bulgan',
        code: 'MN-067',
      },
      {
        name: 'Darhan uul',
        code: 'MN-037',
      },
      {
        name: 'Dornod',
        code: 'MN-061',
      },
      {
        name: 'Dornogovĭ',
        code: 'MN-063',
      },
      {
        name: 'Dundgovĭ',
        code: 'MN-059',
      },
      {
        name: 'Dzavhan',
        code: 'MN-057',
      },
      {
        name: 'Govĭ-Altay',
        code: 'MN-065',
      },
      {
        name: 'Govĭ-Sümber',
        code: 'MN-064',
      },
      {
        name: 'Hentiy',
        code: 'MN-039',
      },
      {
        name: 'Hovd',
        code: 'MN-043',
      },
      {
        name: 'Hövsgöl',
        code: 'MN-041',
      },
      {
        name: 'Orhon',
        code: 'MN-035',
      },
      {
        name: 'Selenge',
        code: 'MN-049',
      },
      {
        name: 'Sühbaatar',
        code: 'MN-051',
      },
      {
        name: 'Töv',
        code: 'MN-047',
      },
      {
        name: 'Ulaanbaatar',
        code: 'MN-1',
      },
      {
        name: 'Uvs',
        code: 'MN-046',
      },
      {
        name: 'Ömnögovĭ',
        code: 'MN-053',
      },
      {
        name: 'Övörhangay',
        code: 'MN-055',
      },
    ],
  },
  //   { name: 'Montserrat', code: 'MS' },
  {
    name: 'Morocco',
    code: 'MA',
    provinces: [
      {
        name: 'Chaouia-Ouardigha',
        code: 'MA-09',
      },
      {
        name: 'Doukhala-Abda',
        code: 'MA-10',
      },
      {
        name: 'Fès-Boulemane',
        code: 'MA-05',
      },
      {
        name: 'Gharb-Chrarda-Beni Hssen',
        code: 'MA-02',
      },
      {
        name: 'Grand Casablanca',
        code: 'MA-08',
      },
      {
        name: 'Guelmim-Es Smara',
        code: 'MA-14',
      },
      {
        name: "L'Oriental",
        code: 'MA-04',
      },
      {
        name: 'Laâyoune-Boujdour-Sakia el Hamra',
        code: 'MA-15',
      },
      {
        name: 'Marrakech-Tensift-Al Haouz',
        code: 'MA-11',
      },
      {
        name: 'Meknès-Tafilalet',
        code: 'MA-06',
      },
      {
        name: 'Oued ed Dahab-Lagouira',
        code: 'MA-16',
      },
      {
        name: 'Rabat-Salé-Zemmour-Zaer',
        code: 'MA-07',
      },
      {
        name: 'Souss-Massa-Drâa',
        code: 'MA-13',
      },
      {
        name: 'Tadla-Azilal',
        code: 'MA-12',
      },
      {
        name: 'Tanger-Tétouan',
        code: 'MA-01',
      },
      {
        name: 'Taza-Al Hoceima-Taounate',
        code: 'MA-03',
      },
    ],
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    provinces: [
      {
        name: 'Cabo Delgado',
        code: 'MZ-P',
      },
      {
        name: 'Gaza',
        code: 'MZ-G',
      },
      {
        name: 'Inhambane',
        code: 'MZ-I',
      },
      {
        name: 'Manica',
        code: 'MZ-B',
      },
      {
        name: 'Maputo',
        code: 'MZ-MPM',
      },
      {
        name: 'Maputo',
        code: 'MZ-L',
      },
      {
        name: 'Nampula',
        code: 'MZ-N',
      },
      {
        name: 'Niassa',
        code: 'MZ-A',
      },
      {
        name: 'Sofala',
        code: 'MZ-S',
      },
      {
        name: 'Tete',
        code: 'MZ-T',
      },
      {
        name: 'Zambézia',
        code: 'MZ-Q',
      },
    ],
  },
  {
    name: 'Myanmar',
    code: 'MM',
    provinces: [
      {
        name: 'Ayeyarwady',
        code: 'MM-07',
      },
      {
        name: 'Bago',
        code: 'MM-02',
      },
      {
        name: 'Chin',
        code: 'MM-14',
      },
      {
        name: 'Kachin',
        code: 'MM-11',
      },
      {
        name: 'Kayah',
        code: 'MM-12',
      },
      {
        name: 'Kayin',
        code: 'MM-13',
      },
      {
        name: 'Magway',
        code: 'MM-03',
      },
      {
        name: 'Mandalay',
        code: 'MM-04',
      },
      {
        name: 'Mon',
        code: 'MM-15',
      },
      {
        name: 'Rakhine',
        code: 'MM-16',
      },
      {
        name: 'Sagaing',
        code: 'MM-01',
      },
      {
        name: 'Shan',
        code: 'MM-17',
      },
      {
        name: 'Tanintharyi',
        code: 'MM-05',
      },
      {
        name: 'Yangon',
        code: 'MM-06',
      },
    ],
  },
  {
    name: 'Namibia',
    code: 'NA',
    provinces: [
      {
        name: 'Erongo',
        code: 'NA-ER',
      },
      {
        name: 'Hardap',
        code: 'NA-HA',
      },
      {
        name: 'Karas',
        code: 'NA-KA',
      },
      {
        name: 'Kavango East',
        code: 'NA-KE',
      },
      {
        name: 'Kavango West',
        code: 'NA-KW',
      },
      {
        name: 'Khomas',
        code: 'NA-KH',
      },
      {
        name: 'Kunene',
        code: 'NA-KU',
      },
      {
        name: 'Ohangwena',
        code: 'NA-OW',
      },
      {
        name: 'Omaheke',
        code: 'NA-OH',
      },
      {
        name: 'Omusati',
        code: 'NA-OS',
      },
      {
        name: 'Oshana',
        code: 'NA-ON',
      },
      {
        name: 'Oshikoto',
        code: 'NA-OT',
      },
      {
        name: 'Otjozondjupa',
        code: 'NA-OD',
      },
      {
        name: 'Zambezi',
        code: 'NA-CA',
      },
    ],
  },
  {
    name: 'Nauru',
    code: 'NR',
    provinces: [
      {
        name: 'Aiwo',
        code: 'NR-01',
      },
      {
        name: 'Anabar',
        code: 'NR-02',
      },
      {
        name: 'Anetan',
        code: 'NR-03',
      },
      {
        name: 'Anibare',
        code: 'NR-04',
      },
      {
        name: 'Baiti',
        code: 'NR-05',
      },
      {
        name: 'Boe',
        code: 'NR-06',
      },
      {
        name: 'Buada',
        code: 'NR-07',
      },
      {
        name: 'Denigomodu',
        code: 'NR-08',
      },
      {
        name: 'Ewa',
        code: 'NR-09',
      },
      {
        name: 'Ijuw',
        code: 'NR-10',
      },
      {
        name: 'Meneng',
        code: 'NR-11',
      },
      {
        name: 'Nibok',
        code: 'NR-12',
      },
      {
        name: 'Uaboe',
        code: 'NR-13',
      },
      {
        name: 'Yaren',
        code: 'NR-14',
      },
    ],
  },
  {
    name: 'Nepal',
    code: 'NP',
    provinces: [
      {
        name: 'Madhya Pashchimanchal',
        code: 'NP-2',
      },
      {
        name: 'Madhyamanchal',
        code: 'NP-1',
      },
      {
        name: 'Pashchimanchal',
        code: 'NP-3',
      },
      {
        name: 'Purwanchal',
        code: 'NP-4',
      },
      {
        name: 'Sudur Pashchimanchal',
        code: 'NP-5',
      },
    ],
  },
  {
    name: 'Netherlands',
    code: 'NL',
    provinces: [
      {
        name: 'Drenthe',
        code: 'NL-DR',
        subdivision: 'Province',
      },
      {
        name: 'Flevoland',
        code: 'NL-FL',
        subdivision: 'Province',
      },
      {
        name: 'Fryslân',
        code: 'NL-FR',
        subdivision: 'Province',
      },
      {
        name: 'Gelderland',
        code: 'NL-GE',
        subdivision: 'Province',
      },
      {
        name: 'Groningen',
        code: 'NL-GR',
        subdivision: 'Province',
      },
      {
        name: 'Limburg',
        code: 'NL-LI',
        subdivision: 'Province',
      },
      {
        name: 'Noord-Brabant',
        code: 'NL-NB',
        subdivision: 'Province',
      },
      {
        name: 'Noord-Holland',
        code: 'NL-NH',
        subdivision: 'Province',
      },
      {
        name: 'Overijssel',
        code: 'NL-OV',
        subdivision: 'Province',
      },
      {
        name: 'Utrecht',
        code: 'NL-UT',
        subdivision: 'Province',
      },
      {
        name: 'Zeeland',
        code: 'NL-ZE',
        subdivision: 'Province',
      },
      {
        name: 'Zuid-Holland',
        code: 'NL-ZH',
        subdivision: 'Province',
      },
      {
        name: 'Aruba',
        code: 'NL-AW',
        subdivision: 'country',
      },
      {
        name: 'Curaçao',
        code: 'NL-CW',
        subdivision: 'country',
      },
      {
        name: 'Sint Maarten',
        code: 'NL-SX',
        subdivision: 'country',
      },
      {
        name: 'Bonaire',
        code: 'NL-BQ1',
        subdivision: 'special municipality',
      },
      {
        name: 'Saba',
        code: 'NL-BQ2',
        subdivision: 'special municipality',
      },
      {
        name: 'Sint Eustatius',
        code: 'NL-BQ3',
        subdivision: 'special municipality',
      },
    ],
  },
  //   { name: 'Netherlands Antilles', code: 'AN' },
  //   { name: 'New Caledonia', code: 'NC' },
  {
    name: 'New Zealand',
    code: 'NZ',
    provinces: [
      {
        name: 'North Island',
        code: 'NZ-N',
        subdivision: 'Island',
      },
      {
        name: 'South Island',
        code: 'NZ-S',
        subdivision: 'Island',
      },
      {
        name: 'Auckland',
        code: 'NZ-AUK',
        subdivision: 'regional council',
        native: 'Tāmaki-makau-rau',
      },
      {
        name: 'Bay of Plenty',
        code: 'NZ-BOP',
        subdivision: 'regional council',
        native: 'Te Moana a Toi Te Huatahi',
      },
      {
        name: 'Canterbury',
        code: 'NZ-CAN',
        subdivision: 'regional council',
        native: 'Waitaha',
      },
      {
        name: "Hawke's Bay",
        code: 'NZ-HKB',
        subdivision: 'regional council',
        native: 'Te Matau a Māui',
      },
      {
        name: 'Manawatu-Wanganui',
        code: 'NZ-MWT',
        subdivision: 'regional council',
        native: 'Manawatu Whanganui',
      },
      {
        name: 'Northland',
        code: 'NZ-NTL',
        subdivision: 'regional council',
        native: 'Te Tai tokerau',
      },
      {
        name: 'Otago',
        code: 'NZ-OTA',
        subdivision: 'regional council',
        native: 'Ō Tākou',
      },
      {
        name: 'Southland',
        code: 'NZ-STL',
        subdivision: 'regional council',
        native: 'Murihiku',
      },
      {
        name: 'Taranaki',
        code: 'NZ-TKI',
        subdivision: 'regional council',
        native: 'Taranaki',
      },
      {
        name: 'Waikato',
        code: 'NZ-WKO',
        subdivision: 'regional council',
        native: 'Waikato',
      },
      {
        name: 'Wellington',
        code: 'NZ-WGN',
        subdivision: 'regional council',
        native: 'Te Whanga-nui-a-Tara',
      },
      {
        name: 'West Coast',
        code: 'NZ-WTC',
        subdivision: 'regional council',
        native: 'Te Taihau ā uru',
      },
      {
        name: 'Chatham Islands Territory',
        code: 'NZ-CIT',
        subdivision: 'special island authority',
        native: 'Wharekauri',
      },
      {
        name: 'Gisborne District',
        code: 'NZ-GIS',
        subdivision: 'unitary authority',
        native: 'Tūranga nui a Kiwa',
      },
      {
        name: 'Marlborough District',
        code: 'NZ-MBH',
        subdivision: 'unitary authority',
      },
      {
        name: 'Nelson City',
        code: 'NZ-NSN',
        subdivision: 'unitary authority',
        native: 'Whakatū',
      },
      {
        name: 'Tasman District',
        code: 'NZ-TAS',
        subdivision: 'unitary authority',
      },
    ],
  },
  {
    name: 'Nicaragua',
    code: 'NI',
    provinces: [
      {
        name: 'Atlántico Norte',
        code: 'NI-AN',
      },
      {
        name: 'Atlántico Sur',
        code: 'NI-AS',
      },
      {
        name: 'Boaco',
        code: 'NI-BO',
      },
      {
        name: 'Carazo',
        code: 'NI-CA',
      },
      {
        name: 'Chinandega',
        code: 'NI-CI',
      },
      {
        name: 'Chontales',
        code: 'NI-CO',
      },
      {
        name: 'Estelí',
        code: 'NI-ES',
      },
      {
        name: 'Granada',
        code: 'NI-GR',
      },
      {
        name: 'Jinotega',
        code: 'NI-JI',
      },
      {
        name: 'León',
        code: 'NI-LE',
      },
      {
        name: 'Madriz',
        code: 'NI-MD',
      },
      {
        name: 'Managua',
        code: 'NI-MN',
      },
      {
        name: 'Masaya',
        code: 'NI-MS',
      },
      {
        name: 'Matagalpa',
        code: 'NI-MT',
      },
      {
        name: 'Nueva Segovia',
        code: 'NI-NS',
      },
      {
        name: 'Rivas',
        code: 'NI-RI',
      },
      {
        name: 'Río San Juan',
        code: 'NI-SJ',
      },
    ],
  },
  {
    name: 'Niger',
    code: 'NE',
    provinces: [
      {
        name: 'Agadez',
        code: 'NE-1',
      },
      {
        name: 'Diffa',
        code: 'NE-2',
      },
      {
        name: 'Dosso',
        code: 'NE-3',
      },
      {
        name: 'Maradi',
        code: 'NE-4',
      },
      {
        name: 'Niamey',
        code: 'NE-8',
      },
      {
        name: 'Tahoua',
        code: 'NE-5',
      },
      {
        name: 'Tillabéri',
        code: 'NE-6',
      },
      {
        name: 'Zinder',
        code: 'NE-7',
      },
    ],
  },
  {
    name: 'Nigeria',
    code: 'NG',
    provinces: [
      {
        name: 'Abia',
        code: 'NG-AB',
      },
      {
        name: 'Abuja Federal Capital Territory',
        code: 'NG-FC',
      },
      {
        name: 'Adamawa',
        code: 'NG-AD',
      },
      {
        name: 'Akwa Ibom',
        code: 'NG-AK',
      },
      {
        name: 'Anambra',
        code: 'NG-AN',
      },
      {
        name: 'Bauchi',
        code: 'NG-BA',
      },
      {
        name: 'Bayelsa',
        code: 'NG-BY',
      },
      {
        name: 'Benue',
        code: 'NG-BE',
      },
      {
        name: 'Borno',
        code: 'NG-BO',
      },
      {
        name: 'Cross River',
        code: 'NG-CR',
      },
      {
        name: 'Delta',
        code: 'NG-DE',
      },
      {
        name: 'Ebonyi',
        code: 'NG-EB',
      },
      {
        name: 'Edo',
        code: 'NG-ED',
      },
      {
        name: 'Ekiti',
        code: 'NG-EK',
      },
      {
        name: 'Enugu',
        code: 'NG-EN',
      },
      {
        name: 'Gombe',
        code: 'NG-GO',
      },
      {
        name: 'Imo',
        code: 'NG-IM',
      },
      {
        name: 'Jigawa',
        code: 'NG-JI',
      },
      {
        name: 'Kaduna',
        code: 'NG-KD',
      },
      {
        name: 'Kano',
        code: 'NG-KN',
      },
      {
        name: 'Katsina',
        code: 'NG-KT',
      },
      {
        name: 'Kebbi',
        code: 'NG-KE',
      },
      {
        name: 'Kogi',
        code: 'NG-KO',
      },
      {
        name: 'Kwara',
        code: 'NG-KW',
      },
      {
        name: 'Lagos',
        code: 'NG-LA',
      },
      {
        name: 'Nassarawa',
        code: 'NG-NA',
      },
      {
        name: 'Niger',
        code: 'NG-NI',
      },
      {
        name: 'Ogun',
        code: 'NG-OG',
      },
      {
        name: 'Ondo',
        code: 'NG-ON',
      },
      {
        name: 'Osun',
        code: 'NG-OS',
      },
      {
        name: 'Oyo',
        code: 'NG-OY',
      },
      {
        name: 'Plateau',
        code: 'NG-PL',
      },
      {
        name: 'Rivers',
        code: 'NG-RI',
      },
      {
        name: 'Sokoto',
        code: 'NG-SO',
      },
      {
        name: 'Taraba',
        code: 'NG-TA',
      },
      {
        name: 'Yobe',
        code: 'NG-YO',
      },
      {
        name: 'Zamfara',
        code: 'NG-ZA',
      },
    ],
  },
  //   { name: 'Niue', code: 'NU' },
  //   { name: 'Norfolk Island', code: 'NF' },
  //   { name: 'Northern Mariana Islands', code: 'MP' },
  {
    name: 'Norway',
    code: 'NO',
    provinces: [
      {
        name: 'Akershus',
        code: 'NO-02',
      },
      {
        name: 'Aust-Agder',
        code: 'NO-09',
      },
      {
        name: 'Buskerud',
        code: 'NO-06',
      },
      {
        name: 'Finnmark',
        code: 'NO-20',
      },
      {
        name: 'Hedmark',
        code: 'NO-04',
      },
      {
        name: 'Hordaland',
        code: 'NO-12',
      },
      {
        name: 'Jan Mayen',
        code: 'NO-22',
      },
      {
        name: 'Møre og Romsdal',
        code: 'NO-15',
      },
      {
        name: 'Nord-Trøndelag',
        code: 'NO-17',
      },
      {
        name: 'Nordland',
        code: 'NO-18',
      },
      {
        name: 'Oppland',
        code: 'NO-05',
      },
      {
        name: 'Oslo',
        code: 'NO-03',
      },
      {
        name: 'Rogaland',
        code: 'NO-11',
      },
      {
        name: 'Sogn og Fjordane',
        code: 'NO-14',
      },
      {
        name: 'Svalbard',
        code: 'NO-21',
      },
      {
        name: 'Sør-Trøndelag',
        code: 'NO-16',
      },
      {
        name: 'Telemark',
        code: 'NO-08',
      },
      {
        name: 'Troms',
        code: 'NO-19',
      },
      {
        name: 'Vest-Agder',
        code: 'NO-10',
      },
      {
        name: 'Vestfold',
        code: 'NO-07',
      },
      {
        name: 'Østfold',
        code: 'NO-01',
      },
    ],
  },
  {
    name: 'Oman',
    code: 'OM',
    provinces: [
      {
        name: 'Ad Dākhilīyah',
        code: 'OM-DA',
      },
      {
        name: 'Al Buraymī',
        code: 'OM-BU',
      },
      {
        name: 'Al Bāţinah',
        code: 'OM-BA',
      },
      {
        name: 'Al Wusţá',
        code: 'OM-WU',
      },
      {
        name: 'Ash Sharqīyah',
        code: 'OM-SH',
      },
      {
        name: 'Az̧ Z̧āhirah',
        code: 'OM-ZA',
      },
      {
        name: 'Masqaţ',
        code: 'OM-MA',
      },
      {
        name: 'Musandam',
        code: 'OM-MU',
      },
      {
        name: 'Z̧ufār',
        code: 'OM-ZU',
      },
    ],
  },
  {
    name: 'Pakistan',
    code: 'PK',
    provinces: [
      {
        name: 'Azad Kashmir',
        code: 'PK-JK',
      },
      {
        name: 'Balochistan',
        code: 'PK-BA',
      },
      {
        name: 'Federally Administered Tribal Areas',
        code: 'PK-TA',
      },
      {
        name: 'Gilgit-Baltistan',
        code: 'PK-GB',
      },
      {
        name: 'Islamabad',
        code: 'PK-IS',
      },
      {
        name: 'Khyber Pakhtunkhwa',
        code: 'PK-KP',
      },
      {
        name: 'Punjab',
        code: 'PK-PB',
      },
      {
        name: 'Sindh',
        code: 'PK-SD',
      },
    ],
  },
  {
    name: 'Palau',
    code: 'PW',
    provinces: [
      {
        name: 'Aimeliik',
        code: 'PW-002',
      },
      {
        name: 'Airai',
        code: 'PW-004',
      },
      {
        name: 'Angaur',
        code: 'PW-010',
      },
      {
        name: 'Hatobohei',
        code: 'PW-050',
      },
      {
        name: 'Kayangel',
        code: 'PW-100',
      },
      {
        name: 'Koror',
        code: 'PW-150',
      },
      {
        name: 'Melekeok',
        code: 'PW-212',
      },
      {
        name: 'Ngaraard',
        code: 'PW-214',
      },
      {
        name: 'Ngarchelong',
        code: 'PW-218',
      },
      {
        name: 'Ngardmau',
        code: 'PW-222',
      },
      {
        name: 'Ngatpang',
        code: 'PW-224',
      },
      {
        name: 'Ngchesar',
        code: 'PW-226',
      },
      {
        name: 'Ngeremlengui',
        code: 'PW-227',
      },
      {
        name: 'Ngiwal',
        code: 'PW-228',
      },
      {
        name: 'Peleliu',
        code: 'PW-350',
      },
      {
        name: 'Sonsorol',
        code: 'PW-370',
      },
    ],
  },
  {
    name: 'Palestinian Territory, Occupied',
    code: 'PS',
    provinces: [
      {
        name: 'Bethlehem',
        code: 'PS-BTH',
      },
      {
        name: 'Deir El Balah',
        code: 'PS-DEB',
      },
      {
        name: 'Gaza',
        code: 'PS-GZA',
      },
      {
        name: 'Hebron',
        code: 'PS-HBN',
      },
      {
        name: 'Jenin',
        code: 'PS-JEN',
      },
      {
        name: 'Jericho – Al Aghwar',
        code: 'PS-JRH',
      },
      {
        name: 'Jerusalem',
        code: 'PS-JEM',
      },
      {
        name: 'Khan Yunis',
        code: 'PS-KYS',
      },
      {
        name: 'Nablus',
        code: 'PS-NBS',
      },
      {
        name: 'North Gaza',
        code: 'PS-NGZ',
      },
      {
        name: 'Qalqilya',
        code: 'PS-QQA',
      },
      {
        name: 'Rafah',
        code: 'PS-RFH',
      },
      {
        name: 'Ramallah',
        code: 'PS-RBH',
      },
      {
        name: 'Salfit',
        code: 'PS-SLT',
      },
      {
        name: 'Tubas',
        code: 'PS-TBS',
      },
      {
        name: 'Tulkarm',
        code: 'PS-TKM',
      },
    ],
  },
  {
    name: 'Panama',
    code: 'PA',
    provinces: [
      {
        name: 'Bocas del Toro',
        code: 'PA-1',
      },
      {
        name: 'Chiriquí',
        code: 'PA-4',
      },
      {
        name: 'Coclé',
        code: 'PA-2',
      },
      {
        name: 'Colón',
        code: 'PA-3',
      },
      {
        name: 'Darién',
        code: 'PA-5',
      },
      {
        name: 'Emberá',
        code: 'PA-EM',
      },
      {
        name: 'Herrera',
        code: 'PA-6',
      },
      {
        name: 'Kuna Yala',
        code: 'PA-KY',
      },
      {
        name: 'Los Santos',
        code: 'PA-7',
      },
      {
        name: 'Ngöbe-Buglé',
        code: 'PA-NB',
      },
      {
        name: 'Panamá',
        code: 'PA-8',
      },
      {
        name: 'Panamá Oeste',
        code: 'PA-10',
      },
      {
        name: 'Veraguas',
        code: 'PA-9',
      },
    ],
  },
  {
    name: 'Papua New Guinea',
    code: 'PG',
    provinces: [
      {
        name: 'Bougainville',
        code: 'PG-NSB',
      },
      {
        name: 'Central',
        code: 'PG-CPM',
      },
      {
        name: 'Chimbu',
        code: 'PG-CPK',
      },
      {
        name: 'East New Britain',
        code: 'PG-EBR',
      },
      {
        name: 'East Sepik',
        code: 'PG-ESW',
      },
      {
        name: 'Eastern Highlands',
        code: 'PG-EHG',
      },
      {
        name: 'Enga',
        code: 'PG-EPW',
      },
      {
        name: 'Gulf',
        code: 'PG-GPK',
      },
      {
        name: 'Madang',
        code: 'PG-MPM',
      },
      {
        name: 'Manus',
        code: 'PG-MRL',
      },
      {
        name: 'Milne Bay',
        code: 'PG-MBA',
      },
      {
        name: 'Morobe',
        code: 'PG-MPL',
      },
      {
        name: 'National Capital District',
        code: 'PG-NCD',
      },
      {
        name: 'New Ireland',
        code: 'PG-NIK',
      },
      {
        name: 'Northern',
        code: 'PG-NPP',
      },
      {
        name: 'Sandaun',
        code: 'PG-SAN',
      },
      {
        name: 'Southern Highlands',
        code: 'PG-SHM',
      },
      {
        name: 'West New Britain',
        code: 'PG-WBK',
      },
      {
        name: 'Western',
        code: 'PG-WPD',
      },
      {
        name: 'Western Highlands',
        code: 'PG-WHM',
      },
    ],
  },
  {
    name: 'Paraguay',
    code: 'PY',
    provinces: [
      {
        name: 'Alto Paraguay',
        code: 'PY-16',
      },
      {
        name: 'Alto Paraná',
        code: 'PY-10',
      },
      {
        name: 'Amambay',
        code: 'PY-13',
      },
      {
        name: 'Asunción',
        code: 'PY-ASU',
      },
      {
        name: 'Boquerón',
        code: 'PY-19',
      },
      {
        name: 'Caaguazú',
        code: 'PY-5',
      },
      {
        name: 'Caazapá',
        code: 'PY-6',
      },
      {
        name: 'Canindeyú',
        code: 'PY-14',
      },
      {
        name: 'Central',
        code: 'PY-11',
      },
      {
        name: 'Concepción',
        code: 'PY-1',
      },
      {
        name: 'Cordillera',
        code: 'PY-3',
      },
      {
        name: 'Guairá',
        code: 'PY-4',
      },
      {
        name: 'Itapúa',
        code: 'PY-7',
      },
      {
        name: 'Misiones',
        code: 'PY-8',
      },
      {
        name: 'Paraguarí',
        code: 'PY-9',
      },
      {
        name: 'Presidente Hayes',
        code: 'PY-15',
      },
      {
        name: 'San Pedro',
        code: 'PY-2',
      },
      {
        name: 'Ñeembucú',
        code: 'PY-12',
      },
    ],
  },
  {
    name: 'Peru',
    code: 'PE',
    provinces: [
      {
        name: 'Amazonas',
        code: 'PE-AMA',
      },
      {
        name: 'Ancash',
        code: 'PE-ANC',
      },
      {
        name: 'Apurímac',
        code: 'PE-APU',
      },
      {
        name: 'Arequipa',
        code: 'PE-ARE',
      },
      {
        name: 'Ayacucho',
        code: 'PE-AYA',
      },
      {
        name: 'Cajamarca',
        code: 'PE-CAJ',
      },
      {
        name: 'Cusco',
        code: 'PE-CUS',
      },
      {
        name: 'El Callao',
        code: 'PE-CAL',
      },
      {
        name: 'Huancavelica',
        code: 'PE-HUV',
      },
      {
        name: 'Huánuco',
        code: 'PE-HUC',
      },
      {
        name: 'Ica',
        code: 'PE-ICA',
      },
      {
        name: 'Junín',
        code: 'PE-JUN',
      },
      {
        name: 'La Libertad',
        code: 'PE-LAL',
      },
      {
        name: 'Lambayeque',
        code: 'PE-LAM',
      },
      {
        name: 'Lima',
        code: 'PE-LIM',
      },
      {
        name: 'Loreto',
        code: 'PE-LOR',
      },
      {
        name: 'Madre de Dios',
        code: 'PE-MDD',
      },
      {
        name: 'Moquegua',
        code: 'PE-MOQ',
      },
      {
        name: 'Municipalidad Metropolitana de Lima',
        code: 'PE-LMA',
      },
      {
        name: 'Pasco',
        code: 'PE-PAS',
      },
      {
        name: 'Piura',
        code: 'PE-PIU',
      },
      {
        name: 'Puno',
        code: 'PE-PUN',
      },
      {
        name: 'San Martín',
        code: 'PE-SAM',
      },
      {
        name: 'Tacna',
        code: 'PE-TAC',
      },
      {
        name: 'Tumbes',
        code: 'PE-TUM',
      },
      {
        name: 'Ucayali',
        code: 'PE-UCA',
      },
    ],
  },
  {
    name: 'Philippines',
    code: 'PH',
    provinces: [
      {
        name: 'Autonomous Region in Muslim Mindanao',
        code: 'PH-14',
      },
      {
        name: 'Bicol',
        code: 'PH-05',
      },
      {
        name: 'Cagayan Valley',
        code: 'PH-02',
      },
      {
        name: 'Calabarzon',
        code: 'PH-40',
      },
      {
        name: 'Caraga',
        code: 'PH-13',
      },
      {
        name: 'Central Luzon',
        code: 'PH-03',
      },
      {
        name: 'Central Visayas',
        code: 'PH-07',
      },
      {
        name: 'Cordillera Administrative Region',
        code: 'PH-15',
      },
      {
        name: 'Davao',
        code: 'PH-11',
      },
      {
        name: 'Eastern Visayas',
        code: 'PH-08',
      },
      {
        name: 'Ilocos',
        code: 'PH-01',
      },
      {
        name: 'Mimaropa',
        code: 'PH-41',
      },
      {
        name: 'National Capital Region',
        code: 'PH-00',
      },
      {
        name: 'Northern Mindanao',
        code: 'PH-10',
      },
      {
        name: 'Soccsksargen',
        code: 'PH-12',
      },
      {
        name: 'Western Visayas',
        code: 'PH-06',
      },
      {
        name: 'Zamboanga Peninsula',
        code: 'PH-09',
      },
    ],
  },
  //   { name: 'Pitcairn', code: 'PN' },
  {
    name: 'Poland',
    code: 'PL',
    provinces: [
      {
        name: 'Dolnośląskie',
        code: 'PL-DS',
      },
      {
        name: 'Kujawsko-pomorskie',
        code: 'PL-KP',
      },
      {
        name: 'Lubelskie',
        code: 'PL-LU',
      },
      {
        name: 'Lubuskie',
        code: 'PL-LB',
      },
      {
        name: 'Mazowieckie',
        code: 'PL-MZ',
      },
      {
        name: 'Małopolskie',
        code: 'PL-MA',
      },
      {
        name: 'Opolskie',
        code: 'PL-OP',
      },
      {
        name: 'Podkarpackie',
        code: 'PL-PK',
      },
      {
        name: 'Podlaskie',
        code: 'PL-PD',
      },
      {
        name: 'Pomorskie',
        code: 'PL-PM',
      },
      {
        name: 'Warmińsko-mazurskie',
        code: 'PL-WN',
      },
      {
        name: 'Wielkopolskie',
        code: 'PL-WP',
      },
      {
        name: 'Zachodniopomorskie',
        code: 'PL-ZP',
      },
      {
        name: 'Łódzkie',
        code: 'PL-LD',
      },
      {
        name: 'Śląskie',
        code: 'PL-SL',
      },
      {
        name: 'Świętokrzyskie',
        code: 'PL-SK',
      },
    ],
  },
  {
    name: 'Portugal',
    code: 'PT',
    provinces: [
      {
        name: 'Aveiro',
        code: 'PT-01',
      },
      {
        name: 'Beja',
        code: 'PT-02',
      },
      {
        name: 'Braga',
        code: 'PT-03',
      },
      {
        name: 'Bragança',
        code: 'PT-04',
      },
      {
        name: 'Castelo Branco',
        code: 'PT-05',
      },
      {
        name: 'Coimbra',
        code: 'PT-06',
      },
      {
        name: 'Faro',
        code: 'PT-08',
      },
      {
        name: 'Guarda',
        code: 'PT-09',
      },
      {
        name: 'Leiria',
        code: 'PT-10',
      },
      {
        name: 'Lisboa',
        code: 'PT-11',
      },
      {
        name: 'Portalegre',
        code: 'PT-12',
      },
      {
        name: 'Porto',
        code: 'PT-13',
      },
      {
        name: 'Região Autónoma da Madeira',
        code: 'PT-30',
      },
      {
        name: 'Região Autónoma dos Açores',
        code: 'PT-20',
      },
      {
        name: 'Santarém',
        code: 'PT-14',
      },
      {
        name: 'Setúbal',
        code: 'PT-15',
      },
      {
        name: 'Viana do Castelo',
        code: 'PT-16',
      },
      {
        name: 'Vila Real',
        code: 'PT-17',
      },
      {
        name: 'Viseu',
        code: 'PT-18',
      },
      {
        name: 'Évora',
        code: 'PT-07',
      },
    ],
  },
  //   { name: 'Puerto Rico', code: 'PR' },
  {
    name: 'Qatar',
    code: 'QA',
    provinces: [
      {
        name: 'Ad Dawḩah',
        code: 'QA-DA',
      },
      {
        name: 'Al Khawr wa adh Dhakhīrah',
        code: 'QA-KH',
      },
      {
        name: 'Al Wakrah',
        code: 'QA-WA',
      },
      {
        name: 'Ar Rayyān',
        code: 'QA-RA',
      },
      {
        name: 'Ash Shamāl',
        code: 'QA-MS',
      },
      {
        name: 'Az̧ Za̧`āyin',
        code: 'QA-ZA',
      },
      {
        name: 'Umm Şalāl',
        code: 'QA-US',
      },
    ],
  },
  //   { name: 'Reunion', code: 'RE' },
  {
    name: 'Romania',
    code: 'RO',
    provinces: [
      {
        name: 'Alba',
        code: 'RO-AB',
      },
      {
        name: 'Arad',
        code: 'RO-AR',
      },
      {
        name: 'Argeș',
        code: 'RO-AG',
      },
      {
        name: 'Bacău',
        code: 'RO-BC',
      },
      {
        name: 'Bihor',
        code: 'RO-BH',
      },
      {
        name: 'Bistrița-Năsăud',
        code: 'RO-BN',
      },
      {
        name: 'Botoșani',
        code: 'RO-BT',
      },
      {
        name: 'Brașov',
        code: 'RO-BV',
      },
      {
        name: 'Brăila',
        code: 'RO-BR',
      },
      {
        name: 'București',
        code: 'RO-B',
      },
      {
        name: 'Buzău',
        code: 'RO-BZ',
      },
      {
        name: 'Caraș-Severin',
        code: 'RO-CS',
      },
      {
        name: 'Cluj',
        code: 'RO-CJ',
      },
      {
        name: 'Constanța',
        code: 'RO-CT',
      },
      {
        name: 'Covasna',
        code: 'RO-CV',
      },
      {
        name: 'Călărași',
        code: 'RO-CL',
      },
      {
        name: 'Dolj',
        code: 'RO-DJ',
      },
      {
        name: 'Dâmbovița',
        code: 'RO-DB',
      },
      {
        name: 'Galați',
        code: 'RO-GL',
      },
      {
        name: 'Giurgiu',
        code: 'RO-GR',
      },
      {
        name: 'Gorj',
        code: 'RO-GJ',
      },
      {
        name: 'Harghita',
        code: 'RO-HR',
      },
      {
        name: 'Hunedoara',
        code: 'RO-HD',
      },
      {
        name: 'Ialomița',
        code: 'RO-IL',
      },
      {
        name: 'Iași',
        code: 'RO-IS',
      },
      {
        name: 'Ilfov',
        code: 'RO-IF',
      },
      {
        name: 'Maramureș',
        code: 'RO-MM',
      },
      {
        name: 'Mehedinți',
        code: 'RO-MH',
      },
      {
        name: 'Mureș',
        code: 'RO-MS',
      },
      {
        name: 'Neamț',
        code: 'RO-NT',
      },
      {
        name: 'Olt',
        code: 'RO-OT',
      },
      {
        name: 'Prahova',
        code: 'RO-PH',
      },
      {
        name: 'Satu Mare',
        code: 'RO-SM',
      },
      {
        name: 'Sibiu',
        code: 'RO-SB',
      },
      {
        name: 'Suceava',
        code: 'RO-SV',
      },
      {
        name: 'Sălaj',
        code: 'RO-SJ',
      },
      {
        name: 'Teleorman',
        code: 'RO-TR',
      },
      {
        name: 'Timiș',
        code: 'RO-TM',
      },
      {
        name: 'Tulcea',
        code: 'RO-TL',
      },
      {
        name: 'Vaslui',
        code: 'RO-VS',
      },
      {
        name: 'Vrancea',
        code: 'RO-VN',
      },
      {
        name: 'Vâlcea',
        code: 'RO-VL',
      },
    ],
  },
  {
    name: 'Russian Federation',
    code: 'RU',
    provinces: [
      {
        name: "Amurskaya oblast'",
        code: 'RU-AMU',
        subdivision: 'administrative region',
        native: "Amurskaja oblast'",
      },
      {
        name: "Arkhangel'skaya oblast'",
        code: 'RU-ARK',
        subdivision: 'administrative region',
        native: "Arhangel'skaja oblast'",
      },
      {
        name: "Astrakhanskaya oblast'",
        code: 'RU-AST',
        subdivision: 'administrative region',
        native: "Astrahanskaja oblast'",
      },
      {
        name: "Belgorodskaya oblast'",
        code: 'RU-BEL',
        subdivision: 'administrative region',
        native: "Belgorodskaja oblast'",
      },
      {
        name: "Bryanskaya oblast'",
        code: 'RU-BRY',
        subdivision: 'administrative region',
        native: "Brjanskaja oblast'",
      },
      {
        name: "Chelyabinskaya oblast'",
        code: 'RU-CHE',
        subdivision: 'administrative region',
        native: "Čeljabinskaja oblast'",
      },
      {
        name: "Irkutskaya oblast'",
        code: 'RU-IRK',
        subdivision: 'administrative region',
        native: "Irkutskaja oblast'",
      },
      {
        name: "Ivanovskaya oblast'",
        code: 'RU-IVA',
        subdivision: 'administrative region',
        native: "Ivanovskaja oblast'",
      },
      {
        name: "Kaliningradskaya oblast'",
        code: 'RU-KGD',
        subdivision: 'administrative region',
        native: "Kaliningradskaja oblast'",
      },
      {
        name: "Kaluzhskaya oblast'",
        code: 'RU-KLU',
        subdivision: 'administrative region',
        native: "Kalužskaja oblast'",
      },
      {
        name: "Kemerovskaya oblast'",
        code: 'RU-KEM',
        subdivision: 'administrative region',
        native: "Kemerovskaja oblast'",
      },
      {
        name: "Kirovskaya oblast'",
        code: 'RU-KIR',
        subdivision: 'administrative region',
        native: "Kirovskaja oblast'",
      },
      {
        name: "Kostromskaya oblast'",
        code: 'RU-KOS',
        subdivision: 'administrative region',
        native: "Kostromskaja oblast'",
      },
      {
        name: "Kurganskaya oblast'",
        code: 'RU-KGN',
        subdivision: 'administrative region',
        native: "Kurganskaja oblast'",
      },
      {
        name: "Kurskaya oblast'",
        code: 'RU-KRS',
        subdivision: 'administrative region',
        native: "Kurskaja oblast'",
      },
      {
        name: "Leningradskaya oblast'",
        code: 'RU-LEN',
        subdivision: 'administrative region',
        native: "Leningradskaja oblast'",
      },
      {
        name: "Lipetskaya oblast'",
        code: 'RU-LIP',
        subdivision: 'administrative region',
        native: "Lipetskaja oblast'",
      },
      {
        name: "Magadanskaya oblast'",
        code: 'RU-MAG',
        subdivision: 'administrative region',
        native: "Magadanskaja oblast'",
      },
      {
        name: "Moskovskaya oblast'",
        code: 'RU-MOS',
        subdivision: 'administrative region',
        native: "Moskovskaja oblast'",
      },
      {
        name: "Murmanskaya oblast'",
        code: 'RU-MUR',
        subdivision: 'administrative region',
        native: "Murmanskaja oblast'",
      },
      {
        name: "Nizhegorodskaya oblast'",
        code: 'RU-NIZ',
        subdivision: 'administrative region',
        native: "Nižegorodskaja oblast'",
      },
      {
        name: "Novgorodskaya oblast'",
        code: 'RU-NGR',
        subdivision: 'administrative region',
        native: "Novgorodskaja oblast'",
      },
      {
        name: "Novosibirskaya oblast'",
        code: 'RU-NVS',
        subdivision: 'administrative region',
        native: "Novosibirskaja oblast'",
      },
      {
        name: "Omskaya oblast'",
        code: 'RU-OMS',
        subdivision: 'administrative region',
        native: "Omskaja oblast'",
      },
      {
        name: "Orenburgskaya oblast'",
        code: 'RU-ORE',
        subdivision: 'administrative region',
        native: "Orenburgskaja oblast'",
      },
      {
        name: "Orlovskaya oblast'",
        code: 'RU-ORL',
        subdivision: 'administrative region',
        native: "Orlovskaja oblast'",
      },
      {
        name: "Penzenskaya oblast'",
        code: 'RU-PNZ',
        subdivision: 'administrative region',
        native: "Penzenskaja oblast'",
      },
      {
        name: "Pskovskaya oblast'",
        code: 'RU-PSK',
        subdivision: 'administrative region',
        native: "Pskovskaja oblast'",
      },
      {
        name: "Rostovskaya oblast'",
        code: 'RU-ROS',
        subdivision: 'administrative region',
        native: "Rostovskaja oblast'",
      },
      {
        name: "Ryazanskaya oblast'",
        code: 'RU-RYA',
        subdivision: 'administrative region',
        native: "Rjazanskaja oblast'",
      },
      {
        name: "Sakhalinskaya oblast'",
        code: 'RU-SAK',
        subdivision: 'administrative region',
        native: "Sahalinskaja oblast'",
      },
      {
        name: "Samarskaya oblast'",
        code: 'RU-SAM',
        subdivision: 'administrative region',
        native: "Samarskaja oblast'",
      },
      {
        name: "Saratovskaya oblast'",
        code: 'RU-SAR',
        subdivision: 'administrative region',
        native: "Saratovskaja oblast'",
      },
      {
        name: "Smolenskaya oblast'",
        code: 'RU-SMO',
        subdivision: 'administrative region',
        native: "Smolenskaja oblast'",
      },
      {
        name: "Sverdlovskaya oblast'",
        code: 'RU-SVE',
        subdivision: 'administrative region',
        native: "Sverdlovskaja oblast'",
      },
      {
        name: "Tambovskaya oblast'",
        code: 'RU-TAM',
        subdivision: 'administrative region',
        native: "Tambovskaja oblast'",
      },
      {
        name: "Tomskaya oblast'",
        code: 'RU-TOM',
        subdivision: 'administrative region',
        native: "Tomskaja oblast'",
      },
      {
        name: "Tul'skaya oblast'",
        code: 'RU-TUL',
        subdivision: 'administrative region',
        native: "Tul'skaja oblast'",
      },
      {
        name: "Tverskaya oblast'",
        code: 'RU-TVE',
        subdivision: 'administrative region',
        native: "Tverskaja oblast'",
      },
      {
        name: "Tyumenskaya oblast'",
        code: 'RU-TYU',
        subdivision: 'administrative region',
        native: "Tjumenskaja oblast'",
      },
      {
        name: "Ul'yanovskaya oblast'",
        code: 'RU-ULY',
        subdivision: 'administrative region',
        native: "Ul'janovskaja oblast'",
      },
      {
        name: "Vladimirskaya oblast'",
        code: 'RU-VLA',
        subdivision: 'administrative region',
        native: "Vladimirskaja oblast'",
      },
      {
        name: "Volgogradskaya oblast'",
        code: 'RU-VGG',
        subdivision: 'administrative region',
        native: "Volgogradskaja oblast'",
      },
      {
        name: "Vologodskaya oblast'",
        code: 'RU-VLG',
        subdivision: 'administrative region',
        native: "Vologodskaja oblast'",
      },
      {
        name: "Voronezhskaya oblast'",
        code: 'RU-VOR',
        subdivision: 'administrative region',
        native: "Voronežskaja oblast'",
      },
      {
        name: "Yaroslavskaya oblast'",
        code: 'RU-YAR',
        subdivision: 'administrative region',
        native: "Jaroslavskaja oblast'",
      },
      {
        name: 'Altayskiy kray',
        code: 'RU-ALT',
        subdivision: 'administrative territory',
        native: 'Altajskij kraj',
      },
      {
        name: 'Kamchatskiy kray',
        code: 'RU-KAM',
        subdivision: 'administrative territory',
        native: 'Kamčatskij kraj',
      },
      {
        name: 'Khabarovskiy kray',
        code: 'RU-KHA',
        subdivision: 'administrative territory',
        native: 'Habarovskij kraj',
      },
      {
        name: 'Krasnodarskiy kray',
        code: 'RU-KDA',
        subdivision: 'administrative territory',
        native: 'Krasnodarskij kraj',
      },
      {
        name: 'Krasnoyarskiy kray',
        code: 'RU-KYA',
        subdivision: 'administrative territory',
        native: 'Krasnojarskij kraj',
      },
      {
        name: 'Permskiy kray',
        code: 'RU-PER',
        subdivision: 'administrative territory',
        native: 'Permskij kraj',
      },
      {
        name: 'Primorskiy kray',
        code: 'RU-PRI',
        subdivision: 'administrative territory',
        native: 'Primorskij kraj',
      },
      {
        name: "Stavropol'skiy kray",
        code: 'RU-STA',
        subdivision: 'administrative territory',
        native: "Stavropol'skij kraj",
      },
      {
        name: "Zabaykal'skiy kray",
        code: 'RU-ZAB',
        subdivision: 'administrative territory',
        native: "Zabajkal'skij kraj",
      },
      {
        name: 'Moskva',
        code: 'RU-MOW',
        subdivision: 'autonomous city',
        native: 'Moskva',
      },
      {
        name: 'Sankt-Peterburg',
        code: 'RU-SPE',
        subdivision: 'autonomous city',
        native: 'Sankt-Peterburg',
      },
      {
        name: 'Chukotskiy avtonomnyy okrug',
        code: 'RU-CHU',
        subdivision: 'autonomous district',
        native: 'Čukotskij avtonomnyj okrug',
      },
      {
        name: 'Khanty-Mansiyskiy avtonomnyy okrug-Yugra',
        code: 'RU-KHM',
        subdivision: 'autonomous district',
        native: 'Hanty-Mansijskij avtonomnyj okrug-Jugra',
      },
      {
        name: 'Nenetskiy avtonomnyy okrug',
        code: 'RU-NEN',
        subdivision: 'autonomous district',
        native: 'Nenetskij avtonomnyj okrug',
      },
      {
        name: 'Yamalo-Nenetskiy avtonomnyy okrug',
        code: 'RU-YAN',
        subdivision: 'autonomous district',
        native: 'Jamalo-Nenetskij avtonomnyj okrug',
      },
      {
        name: "Yevreyskaya avtonomnaya oblast'",
        code: 'RU-YEV',
        subdivision: 'autonomous region',
        native: "Evrejskaja avtonomnaja oblast'",
      },
      {
        name: 'Adygeya, Respublika',
        code: 'RU-AD',
        subdivision: 'republic',
        native: 'Adygeja, Respublika',
      },
      {
        name: 'Altay, Respublika',
        code: 'RU-AL',
        subdivision: 'republic',
        native: 'Altaj, Respublika',
      },
      {
        name: 'Bashkortostan, Respublika',
        code: 'RU-BA',
        subdivision: 'republic',
        native: 'Baškortostan, Respublika',
      },
      {
        name: 'Buryatiya, Respublika',
        code: 'RU-BU',
        subdivision: 'republic',
        native: 'Burjatija, Respublika',
      },
      {
        name: 'Chechenskaya Respublika',
        code: 'RU-CE',
        subdivision: 'republic',
        native: 'Čečenskaja Respublika',
      },
      {
        name: 'Chuvashskaya Respublika',
        code: 'RU-CU',
        subdivision: 'republic',
        native: 'Čuvašskaja Respublika',
      },
      {
        name: 'Dagestan, Respublika',
        code: 'RU-DA',
        subdivision: 'republic',
        native: 'Dagestan, Respublika',
      },
      {
        name: 'Ingushetiya, Respublika',
        code: 'RU-IN',
        subdivision: 'republic',
        native: 'Ingušetija, Respublika',
      },
      {
        name: 'Kabardino-Balkarskaya Respublika',
        code: 'RU-KB',
        subdivision: 'republic',
        native: 'Kabardino-Balkarskaja Respublika',
      },
      {
        name: 'Kalmykiya, Respublika',
        code: 'RU-KL',
        subdivision: 'republic',
        native: 'Kalmykija, Respublika',
      },
      {
        name: 'Karachayevo-Cherkesskaya Respublika',
        code: 'RU-KC',
        subdivision: 'republic',
        native: 'Karačajevo-Čerkesskaja Respublika',
      },
      {
        name: 'Kareliya, Respublika',
        code: 'RU-KR',
        subdivision: 'republic',
        native: 'Karelija, Respublika',
      },
      {
        name: 'Khakasiya, Respublika',
        code: 'RU-KK',
        subdivision: 'republic',
        native: 'Hakasija, Respublika',
      },
      {
        name: 'Komi, Respublika',
        code: 'RU-KO',
        subdivision: 'republic',
        native: 'Komi, Respublika',
      },
      {
        name: 'Mariy El, Respublika',
        code: 'RU-ME',
        subdivision: 'republic',
        native: 'Marij Èl, Respublika',
      },
      {
        name: 'Mordoviya, Respublika',
        code: 'RU-MO',
        subdivision: 'republic',
        native: 'Mordovija, Respublika',
      },
      {
        name: 'Sakha, Respublika',
        code: 'RU-SA',
        subdivision: 'republic',
        native: 'Saha, Respublika',
      },
      {
        name: 'Severnaya Osetiya-Alaniya, Respublika',
        code: 'RU-SE',
        subdivision: 'republic',
        native: 'Severnaja Osetija-Alanija, Respublika',
      },
      {
        name: 'Tatarstan, Respublika',
        code: 'RU-TA',
        subdivision: 'republic',
        native: 'Tatarstan, Respublika',
      },
      {
        name: 'Tyva, Respublika',
        code: 'RU-TY',
        subdivision: 'republic',
        native: 'Tyva, Respublika',
      },
      {
        name: 'Udmurtskaya Respublika',
        code: 'RU-UD',
        subdivision: 'republic',
        native: 'Udmurtskaja Respublika',
      },
    ],
  },
  {
    name: 'RWANDA',
    code: 'RW',
    provinces: [
      {
        name: 'Est',
        code: 'RW-02',
      },
      {
        name: 'Nord',
        code: 'RW-03',
      },
      {
        name: 'Ouest',
        code: 'RW-04',
      },
      {
        name: 'Sud',
        code: 'RW-05',
      },
      {
        name: 'Ville de Kigali',
        code: 'RW-01',
      },
    ],
  },
  {
    name: 'Saint Helena',
    code: 'SH',
    provinces: [
      {
        name: 'Ascension',
        code: 'SH-AC',
      },
      {
        name: 'Saint Helena',
        code: 'SH-HL',
      },
      {
        name: 'Tristan da Cunha',
        code: 'SH-TA',
      },
    ],
  },
  {
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    provinces: [
      {
        name: 'Nevis',
        code: 'KN-N',
      },
      {
        name: 'Saint Kitts',
        code: 'KN-K',
      },
    ],
  },
  {
    name: 'Saint Lucia',
    code: 'LC',
    provinces: [
      {
        name: 'Anse la Raye',
        code: 'LC-01',
      },
      {
        name: 'Castries',
        code: 'LC-02',
      },
      {
        name: 'Choiseul',
        code: 'LC-03',
      },
      {
        name: 'Dauphin',
        code: 'LC-04',
      },
      {
        name: 'Dennery',
        code: 'LC-05',
      },
      {
        name: 'Gros Islet',
        code: 'LC-06',
      },
      {
        name: 'Laborie',
        code: 'LC-07',
      },
      {
        name: 'Micoud',
        code: 'LC-08',
      },
      {
        name: 'Praslin',
        code: 'LC-09',
      },
      {
        name: 'Soufrière',
        code: 'LC-10',
      },
      {
        name: 'Vieux Fort',
        code: 'LC-11',
      },
    ],
  },
  //   { name: 'Saint Pierre and Miquelon', code: 'PM' },
  {
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    provinces: [
      {
        name: 'Charlotte',
        code: 'VC-01',
      },
      {
        name: 'Grenadines',
        code: 'VC-06',
      },
      {
        name: 'Saint Andrew',
        code: 'VC-02',
      },
      {
        name: 'Saint David',
        code: 'VC-03',
      },
      {
        name: 'Saint George',
        code: 'VC-04',
      },
      {
        name: 'Saint Patrick',
        code: 'VC-05',
      },
    ],
  },
  {
    name: 'Samoa',
    code: 'WS',
    provinces: [
      {
        name: "A'ana",
        code: 'WS-AA',
      },
      {
        name: 'Aiga-i-le-Tai',
        code: 'WS-AL',
      },
      {
        name: 'Atua',
        code: 'WS-AT',
      },
      {
        name: "Fa'asaleleaga",
        code: 'WS-FA',
      },
      {
        name: "Gaga'emauga",
        code: 'WS-GE',
      },
      {
        name: 'Gagaifomauga',
        code: 'WS-GI',
      },
      {
        name: 'Palauli',
        code: 'WS-PA',
      },
      {
        name: "Satupa'itea",
        code: 'WS-SA',
      },
      {
        name: 'Tuamasaga',
        code: 'WS-TU',
      },
      {
        name: "Va'a-o-Fonoti",
        code: 'WS-VF',
      },
      {
        name: 'Vaisigano',
        code: 'WS-VS',
      },
    ],
  },
  {
    name: 'San Marino',
    code: 'SM',
    provinces: [
      {
        name: 'Acquaviva',
        code: 'SM-01',
      },
      {
        name: 'Borgo Maggiore',
        code: 'SM-06',
      },
      {
        name: 'Chiesanuova',
        code: 'SM-02',
      },
      {
        name: 'Domagnano',
        code: 'SM-03',
      },
      {
        name: 'Faetano',
        code: 'SM-04',
      },
      {
        name: 'Fiorentino',
        code: 'SM-05',
      },
      {
        name: 'Montegiardino',
        code: 'SM-08',
      },
      {
        name: 'San Marino',
        code: 'SM-07',
      },
      {
        name: 'Serravalle',
        code: 'SM-09',
      },
    ],
  },
  {
    name: 'Sao Tome and Principe',
    code: 'ST',
    provinces: [
      {
        name: 'Príncipe',
        code: 'ST-P',
      },
      {
        name: 'São Tomé',
        code: 'ST-S',
      },
    ],
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    provinces: [
      {
        name: 'Al Bāḩah',
        code: 'SA-11',
      },
      {
        name: 'Al Jawf',
        code: 'SA-12',
      },
      {
        name: 'Al Madīnah',
        code: 'SA-03',
      },
      {
        name: 'Al Qaşīm',
        code: 'SA-05',
      },
      {
        name: 'Al Ḩudūd ash Shamālīyah',
        code: 'SA-08',
      },
      {
        name: 'Ar Riyāḑ',
        code: 'SA-01',
      },
      {
        name: 'Ash Sharqīyah',
        code: 'SA-04',
      },
      {
        name: 'Jīzān',
        code: 'SA-09',
      },
      {
        name: 'Makkah',
        code: 'SA-02',
      },
      {
        name: 'Najrān',
        code: 'SA-10',
      },
      {
        name: 'Tabūk',
        code: 'SA-07',
      },
      {
        name: 'ٰĀsīr',
        code: 'SA-14',
      },
      {
        name: "Ḩā'il",
        code: 'SA-06',
      },
    ],
  },
  {
    name: 'Senegal',
    code: 'SN',
    provinces: [
      {
        name: 'Dakar',
        code: 'SN-DK',
      },
      {
        name: 'Diourbel',
        code: 'SN-DB',
      },
      {
        name: 'Fatick',
        code: 'SN-FK',
      },
      {
        name: 'Kaffrine',
        code: 'SN-KA',
      },
      {
        name: 'Kaolack',
        code: 'SN-KL',
      },
      {
        name: 'Kolda',
        code: 'SN-KD',
      },
      {
        name: 'Kédougou',
        code: 'SN-KE',
      },
      {
        name: 'Louga',
        code: 'SN-LG',
      },
      {
        name: 'Matam',
        code: 'SN-MT',
      },
      {
        name: 'Saint-Louis',
        code: 'SN-SL',
      },
      {
        name: 'Sédhiou',
        code: 'SN-SE',
      },
      {
        name: 'Tambacounda',
        code: 'SN-TC',
      },
      {
        name: 'Thiès',
        code: 'SN-TH',
      },
      {
        name: 'Ziguinchor',
        code: 'SN-ZG',
      },
    ],
  },
  {
    name: 'Serbia and Montenegro',
    code: 'CS',
    provinces: [
      {
        name: 'Kosovo-Metohija',
        code: 'RS-KM',
      },
      {
        name: 'Vojvodina',
        code: 'RS-VO',
      },
    ],
  },
  {
    name: 'Seychelles',
    code: 'SC',
    provinces: [
      {
        name: 'Anse Boileau',
        code: 'SC-02',
      },
      {
        name: 'Anse Etoile',
        code: 'SC-03',
      },
      {
        name: 'Anse Royale',
        code: 'SC-05',
      },
      {
        name: 'Anse aux Pins',
        code: 'SC-01',
      },
      {
        name: 'Au Cap',
        code: 'SC-04',
      },
      {
        name: 'Baie Lazare',
        code: 'SC-06',
      },
      {
        name: 'Baie Sainte Anne',
        code: 'SC-07',
      },
      {
        name: 'Beau Vallon',
        code: 'SC-08',
      },
      {
        name: 'Bel Air',
        code: 'SC-09',
      },
      {
        name: 'Bel Ombre',
        code: 'SC-10',
      },
      {
        name: 'Cascade',
        code: 'SC-11',
      },
      {
        name: 'English River',
        code: 'SC-16',
      },
      {
        name: 'Glacis',
        code: 'SC-12',
      },
      {
        name: 'Grand Anse Mahe',
        code: 'SC-13',
      },
      {
        name: 'Grand Anse Praslin',
        code: 'SC-14',
      },
      {
        name: 'La Digue',
        code: 'SC-15',
      },
      {
        name: 'Les Mamelles',
        code: 'SC-24',
      },
      {
        name: 'Mont Buxton',
        code: 'SC-17',
      },
      {
        name: 'Mont Fleuri',
        code: 'SC-18',
      },
      {
        name: 'Plaisance',
        code: 'SC-19',
      },
      {
        name: 'Pointe Larue',
        code: 'SC-20',
      },
      {
        name: 'Port Glaud',
        code: 'SC-21',
      },
      {
        name: 'Roche Caiman',
        code: 'SC-25',
      },
      {
        name: 'Saint Louis',
        code: 'SC-22',
      },
      {
        name: 'Takamaka',
        code: 'SC-23',
      },
    ],
  },
  {
    name: 'Sierra Leone',
    code: 'SL',
    provinces: [
      {
        name: 'Eastern',
        code: 'SL-E',
      },
      {
        name: 'Northern',
        code: 'SL-N',
      },
      {
        name: 'Southern',
        code: 'SL-S',
      },
      {
        name: 'Western Area',
        code: 'SL-W',
      },
    ],
  },
  {
    name: 'Singapore',
    code: 'SG',
    provinces: [
      {
        name: 'Central Singapore',
        code: 'SG-01',
      },
      {
        name: 'North East',
        code: 'SG-02',
      },
      {
        name: 'North West',
        code: 'SG-03',
      },
      {
        name: 'South East',
        code: 'SG-04',
      },
      {
        name: 'South West',
        code: 'SG-05',
      },
    ],
  },
  {
    name: 'Slovakia',
    code: 'SK',
    provinces: [
      {
        name: 'Banskobystrický kraj',
        code: 'SK-BC',
      },
      {
        name: 'Bratislavský kraj',
        code: 'SK-BL',
      },
      {
        name: 'Košický kraj',
        code: 'SK-KI',
      },
      {
        name: 'Nitriansky kraj',
        code: 'SK-NI',
      },
      {
        name: 'Prešovský kraj',
        code: 'SK-PV',
      },
      {
        name: 'Trenčiansky kraj',
        code: 'SK-TC',
      },
      {
        name: 'Trnavský kraj',
        code: 'SK-TA',
      },
      {
        name: 'Žilinský kraj',
        code: 'SK-ZI',
      },
    ],
  },
  {
    name: 'Slovenia',
    code: 'SI',
    provinces: [
      {
        name: 'Ajdovščina',
        code: 'SI-001',
      },
      {
        name: 'Apače',
        code: 'SI-195',
      },
      {
        name: 'Beltinci',
        code: 'SI-002',
      },
      {
        name: 'Benedikt',
        code: 'SI-148',
      },
      {
        name: 'Bistrica ob Sotli',
        code: 'SI-149',
      },
      {
        name: 'Bled',
        code: 'SI-003',
      },
      {
        name: 'Bloke',
        code: 'SI-150',
      },
      {
        name: 'Bohinj',
        code: 'SI-004',
      },
      {
        name: 'Borovnica',
        code: 'SI-005',
      },
      {
        name: 'Bovec',
        code: 'SI-006',
      },
      {
        name: 'Braslovče',
        code: 'SI-151',
      },
      {
        name: 'Brda',
        code: 'SI-007',
      },
      {
        name: 'Brezovica',
        code: 'SI-008',
      },
      {
        name: 'Brežice',
        code: 'SI-009',
      },
      {
        name: 'Cankova',
        code: 'SI-152',
      },
      {
        name: 'Celje',
        code: 'SI-011',
      },
      {
        name: 'Cerklje na Gorenjskem',
        code: 'SI-012',
      },
      {
        name: 'Cerknica',
        code: 'SI-013',
      },
      {
        name: 'Cerkno',
        code: 'SI-014',
      },
      {
        name: 'Cerkvenjak',
        code: 'SI-153',
      },
      {
        name: 'Cirkulane',
        code: 'SI-196',
      },
      {
        name: 'Destrnik',
        code: 'SI-018',
      },
      {
        name: 'Divača',
        code: 'SI-019',
      },
      {
        name: 'Dobje',
        code: 'SI-154',
      },
      {
        name: 'Dobrepolje',
        code: 'SI-020',
      },
      {
        name: 'Dobrna',
        code: 'SI-155',
      },
      {
        name: 'Dobrova–Polhov Gradec',
        code: 'SI-021',
      },
      {
        name: 'Dobrovnik',
        code: 'SI-156',
      },
      {
        name: 'Dol pri Ljubljani',
        code: 'SI-022',
      },
      {
        name: 'Dolenjske Toplice',
        code: 'SI-157',
      },
      {
        name: 'Domžale',
        code: 'SI-023',
      },
      {
        name: 'Dornava',
        code: 'SI-024',
      },
      {
        name: 'Dravograd',
        code: 'SI-025',
      },
      {
        name: 'Duplek',
        code: 'SI-026',
      },
      {
        name: 'Gorenja vas–Poljane',
        code: 'SI-027',
      },
      {
        name: 'Gorišnica',
        code: 'SI-028',
      },
      {
        name: 'Gorje',
        code: 'SI-207',
      },
      {
        name: 'Gornja Radgona',
        code: 'SI-029',
      },
      {
        name: 'Gornji Grad',
        code: 'SI-030',
      },
      {
        name: 'Gornji Petrovci',
        code: 'SI-031',
      },
      {
        name: 'Grad',
        code: 'SI-158',
      },
      {
        name: 'Grosuplje',
        code: 'SI-032',
      },
      {
        name: 'Hajdina',
        code: 'SI-159',
      },
      {
        name: 'Hodoš',
        code: 'SI-161',
      },
      {
        name: 'Horjul',
        code: 'SI-162',
      },
      {
        name: 'Hoče–Slivnica',
        code: 'SI-160',
      },
      {
        name: 'Hrastnik',
        code: 'SI-034',
      },
      {
        name: 'Hrpelje-Kozina',
        code: 'SI-035',
      },
      {
        name: 'Idrija',
        code: 'SI-036',
      },
      {
        name: 'Ig',
        code: 'SI-037',
      },
      {
        name: 'Ilirska Bistrica',
        code: 'SI-038',
      },
      {
        name: 'Ivančna Gorica',
        code: 'SI-039',
      },
      {
        name: 'Izola',
        code: 'SI-040',
      },
      {
        name: 'Jesenice',
        code: 'SI-041',
      },
      {
        name: 'Jezersko',
        code: 'SI-163',
      },
      {
        name: 'Juršinci',
        code: 'SI-042',
      },
      {
        name: 'Kamnik',
        code: 'SI-043',
      },
      {
        name: 'Kanal',
        code: 'SI-044',
      },
      {
        name: 'Kidričevo',
        code: 'SI-045',
      },
      {
        name: 'Kobarid',
        code: 'SI-046',
      },
      {
        name: 'Kobilje',
        code: 'SI-047',
      },
      {
        name: 'Komen',
        code: 'SI-049',
      },
      {
        name: 'Komenda',
        code: 'SI-164',
      },
      {
        name: 'Koper',
        code: 'SI-050',
      },
      {
        name: 'Kosanjevica na Krki',
        code: 'SI-197',
      },
      {
        name: 'Kostel',
        code: 'SI-165',
      },
      {
        name: 'Kozje',
        code: 'SI-051',
      },
      {
        name: 'Kočevje',
        code: 'SI-048',
      },
      {
        name: 'Kranj',
        code: 'SI-052',
      },
      {
        name: 'Kranjska Gora',
        code: 'SI-053',
      },
      {
        name: 'Križevci',
        code: 'SI-166',
      },
      {
        name: 'Krško',
        code: 'SI-054',
      },
      {
        name: 'Kungota',
        code: 'SI-055',
      },
      {
        name: 'Kuzma',
        code: 'SI-056',
      },
      {
        name: 'Laško',
        code: 'SI-057',
      },
      {
        name: 'Lenart',
        code: 'SI-058',
      },
      {
        name: 'Lendava',
        code: 'SI-059',
      },
      {
        name: 'Litija',
        code: 'SI-060',
      },
      {
        name: 'Ljubljana',
        code: 'SI-061',
      },
      {
        name: 'Ljubno',
        code: 'SI-062',
      },
      {
        name: 'Ljutomer',
        code: 'SI-063',
      },
      {
        name: 'Log-Dragomer',
        code: 'SI-208',
      },
      {
        name: 'Logatec',
        code: 'SI-064',
      },
      {
        name: 'Lovrenc na Pohorju',
        code: 'SI-167',
      },
      {
        name: 'Loška Dolina',
        code: 'SI-065',
      },
      {
        name: 'Loški Potok',
        code: 'SI-066',
      },
      {
        name: 'Lukovica',
        code: 'SI-068',
      },
      {
        name: 'Luče',
        code: 'SI-067',
      },
      {
        name: 'Majšperk',
        code: 'SI-069',
      },
      {
        name: 'Makole',
        code: 'SI-198',
      },
      {
        name: 'Maribor',
        code: 'SI-070',
      },
      {
        name: 'Markovci',
        code: 'SI-168',
      },
      {
        name: 'Medvode',
        code: 'SI-071',
      },
      {
        name: 'Mengeš',
        code: 'SI-072',
      },
      {
        name: 'Metlika',
        code: 'SI-073',
      },
      {
        name: 'Mežica',
        code: 'SI-074',
      },
      {
        name: 'Miklavž na Dravskem Polju',
        code: 'SI-169',
      },
      {
        name: 'Miren–Kostanjevica',
        code: 'SI-075',
      },
      {
        name: 'Mirna Peč',
        code: 'SI-170',
      },
      {
        name: 'Mislinja',
        code: 'SI-076',
      },
      {
        name: 'Mokronog–Trebelno',
        code: 'SI-199',
      },
      {
        name: 'Moravske Toplice',
        code: 'SI-078',
      },
      {
        name: 'Moravče',
        code: 'SI-077',
      },
      {
        name: 'Mozirje',
        code: 'SI-079',
      },
      {
        name: 'Murska Sobota',
        code: 'SI-080',
      },
      {
        name: 'Muta',
        code: 'SI-081',
      },
      {
        name: 'Naklo',
        code: 'SI-082',
      },
      {
        name: 'Nazarje',
        code: 'SI-083',
      },
      {
        name: 'Nova Gorica',
        code: 'SI-084',
      },
      {
        name: 'Novo Mesto',
        code: 'SI-085',
      },
      {
        name: 'Odranci',
        code: 'SI-086',
      },
      {
        name: 'Oplotnica',
        code: 'SI-171',
      },
      {
        name: 'Ormož',
        code: 'SI-087',
      },
      {
        name: 'Osilnica',
        code: 'SI-088',
      },
      {
        name: 'Pesnica',
        code: 'SI-089',
      },
      {
        name: 'Piran',
        code: 'SI-090',
      },
      {
        name: 'Pivka',
        code: 'SI-091',
      },
      {
        name: 'Podlehnik',
        code: 'SI-172',
      },
      {
        name: 'Podvelka',
        code: 'SI-093',
      },
      {
        name: 'Podčetrtek',
        code: 'SI-092',
      },
      {
        name: 'Poljčane',
        code: 'SI-200',
      },
      {
        name: 'Polzela',
        code: 'SI-173',
      },
      {
        name: 'Postojna',
        code: 'SI-094',
      },
      {
        name: 'Prebold',
        code: 'SI-174',
      },
      {
        name: 'Preddvor',
        code: 'SI-095',
      },
      {
        name: 'Prevalje',
        code: 'SI-175',
      },
      {
        name: 'Ptuj',
        code: 'SI-096',
      },
      {
        name: 'Puconci',
        code: 'SI-097',
      },
      {
        name: 'Radenci',
        code: 'SI-100',
      },
      {
        name: 'Radeče',
        code: 'SI-099',
      },
      {
        name: 'Radlje ob Dravi',
        code: 'SI-101',
      },
      {
        name: 'Radovljica',
        code: 'SI-102',
      },
      {
        name: 'Ravne na Koroškem',
        code: 'SI-103',
      },
      {
        name: 'Razkrižje',
        code: 'SI-176',
      },
      {
        name: 'Rače–Fram',
        code: 'SI-098',
      },
      {
        name: 'Renče-Vogrsko',
        code: 'SI-201',
      },
      {
        name: 'Rečica ob Savinji',
        code: 'SI-209',
      },
      {
        name: 'Ribnica',
        code: 'SI-104',
      },
      {
        name: 'Ribnica na Pohorju',
        code: 'SI-177',
      },
      {
        name: 'Rogatec',
        code: 'SI-107',
      },
      {
        name: 'Rogaška Slatina',
        code: 'SI-106',
      },
      {
        name: 'Rogašovci',
        code: 'SI-105',
      },
      {
        name: 'Ruše',
        code: 'SI-108',
      },
      {
        name: 'Selnica ob Dravi',
        code: 'SI-178',
      },
      {
        name: 'Semič',
        code: 'SI-109',
      },
      {
        name: 'Sevnica',
        code: 'SI-110',
      },
      {
        name: 'Sežana',
        code: 'SI-111',
      },
      {
        name: 'Slovenj Gradec',
        code: 'SI-112',
      },
      {
        name: 'Slovenska Bistrica',
        code: 'SI-113',
      },
      {
        name: 'Slovenske Konjice',
        code: 'SI-114',
      },
      {
        name: 'Sodražica',
        code: 'SI-179',
      },
      {
        name: 'Solčava',
        code: 'SI-180',
      },
      {
        name: 'Središče ob Dravi',
        code: 'SI-202',
      },
      {
        name: 'Starše',
        code: 'SI-115',
      },
      {
        name: 'Straža',
        code: 'SI-203',
      },
      {
        name: 'Sveta Ana',
        code: 'SI-181',
      },
      {
        name: 'Sveta Trojica v Slovenskih Goricah',
        code: 'SI-204',
      },
      {
        name: 'Sveti Andraž v Slovenskih Goricah',
        code: 'SI-182',
      },
      {
        name: 'Sveti Jurij',
        code: 'SI-116',
      },
      {
        name: 'Sveti Jurij v Slovenskih Goricah',
        code: 'SI-210',
      },
      {
        name: 'Sveti Tomaž',
        code: 'SI-205',
      },
      {
        name: 'Tabor',
        code: 'SI-184',
      },
      {
        name: 'Tišina',
        code: 'SI-010',
      },
      {
        name: 'Tolmin',
        code: 'SI-128',
      },
      {
        name: 'Trbovlje',
        code: 'SI-129',
      },
      {
        name: 'Trebnje',
        code: 'SI-130',
      },
      {
        name: 'Trnovska Vas',
        code: 'SI-185',
      },
      {
        name: 'Trzin',
        code: 'SI-186',
      },
      {
        name: 'Tržič',
        code: 'SI-131',
      },
      {
        name: 'Turnišče',
        code: 'SI-132',
      },
      {
        name: 'Velenje',
        code: 'SI-133',
      },
      {
        name: 'Velika Polana',
        code: 'SI-187',
      },
      {
        name: 'Velike Lašče',
        code: 'SI-134',
      },
      {
        name: 'Veržej',
        code: 'SI-188',
      },
      {
        name: 'Videm',
        code: 'SI-135',
      },
      {
        name: 'Vipava',
        code: 'SI-136',
      },
      {
        name: 'Vitanje',
        code: 'SI-137',
      },
      {
        name: 'Vodice',
        code: 'SI-138',
      },
      {
        name: 'Vojnik',
        code: 'SI-139',
      },
      {
        name: 'Vransko',
        code: 'SI-189',
      },
      {
        name: 'Vrhnika',
        code: 'SI-140',
      },
      {
        name: 'Vuzenica',
        code: 'SI-141',
      },
      {
        name: 'Zagorje ob Savi',
        code: 'SI-142',
      },
      {
        name: 'Zavrč',
        code: 'SI-143',
      },
      {
        name: 'Zreče',
        code: 'SI-144',
      },
      {
        name: 'Črenšovci',
        code: 'SI-015',
      },
      {
        name: 'Črna na Koroškem',
        code: 'SI-016',
      },
      {
        name: 'Črnomelj',
        code: 'SI-017',
      },
      {
        name: 'Šalovci',
        code: 'SI-033',
      },
      {
        name: 'Šempeter–Vrtojba',
        code: 'SI-183',
      },
      {
        name: 'Šentilj',
        code: 'SI-118',
      },
      {
        name: 'Šentjernej',
        code: 'SI-119',
      },
      {
        name: 'Šentjur',
        code: 'SI-120',
      },
      {
        name: 'Šentrupert',
        code: 'SI-211',
      },
      {
        name: 'Šenčur',
        code: 'SI-117',
      },
      {
        name: 'Škocjan',
        code: 'SI-121',
      },
      {
        name: 'Škofja Loka',
        code: 'SI-122',
      },
      {
        name: 'Škofljica',
        code: 'SI-123',
      },
      {
        name: 'Šmarje pri Jelšah',
        code: 'SI-124',
      },
      {
        name: 'Šmarješke Toplice',
        code: 'SI-206',
      },
      {
        name: 'Šmartno ob Paki',
        code: 'SI-125',
      },
      {
        name: 'Šmartno pri Litiji',
        code: 'SI-194',
      },
      {
        name: 'Šoštanj',
        code: 'SI-126',
      },
      {
        name: 'Štore',
        code: 'SI-127',
      },
      {
        name: 'Žalec',
        code: 'SI-190',
      },
      {
        name: 'Železniki',
        code: 'SI-146',
      },
      {
        name: 'Žetale',
        code: 'SI-191',
      },
      {
        name: 'Žiri',
        code: 'SI-147',
      },
      {
        name: 'Žirovnica',
        code: 'SI-192',
      },
      {
        name: 'Žužemberk',
        code: 'SI-193',
      },
    ],
  },
  {
    name: 'Solomon Islands',
    code: 'SB',
    provinces: [
      {
        name: 'Capital Territory',
        code: 'SB-CT',
      },
      {
        name: 'Central',
        code: 'SB-CE',
      },
      {
        name: 'Choiseul',
        code: 'SB-CH',
      },
      {
        name: 'Guadalcanal',
        code: 'SB-GU',
      },
      {
        name: 'Isabel',
        code: 'SB-IS',
      },
      {
        name: 'Makira-Ulawa',
        code: 'SB-MK',
      },
      {
        name: 'Malaita',
        code: 'SB-ML',
      },
      {
        name: 'Rennell and Bellona',
        code: 'SB-RB',
      },
      {
        name: 'Temotu',
        code: 'SB-TE',
      },
      {
        name: 'Western',
        code: 'SB-WE',
      },
    ],
  },
  {
    name: 'Somalia',
    code: 'SO',
    provinces: [
      {
        name: 'Awdal',
        code: 'SO-AW',
      },
      {
        name: 'Bakool',
        code: 'SO-BK',
      },
      {
        name: 'Banaadir',
        code: 'SO-BN',
      },
      {
        name: 'Bari',
        code: 'SO-BR',
      },
      {
        name: 'Bay',
        code: 'SO-BY',
      },
      {
        name: 'Galguduud',
        code: 'SO-GA',
      },
      {
        name: 'Gedo',
        code: 'SO-GE',
      },
      {
        name: 'Hiiraan',
        code: 'SO-HI',
      },
      {
        name: 'Jubbada Dhexe',
        code: 'SO-JD',
      },
      {
        name: 'Jubbada Hoose',
        code: 'SO-JH',
      },
      {
        name: 'Mudug',
        code: 'SO-MU',
      },
      {
        name: 'Nugaal',
        code: 'SO-NU',
      },
      {
        name: 'Sanaag',
        code: 'SO-SA',
      },
      {
        name: 'Shabeellaha Dhexe',
        code: 'SO-SD',
      },
      {
        name: 'Shabeellaha Hoose',
        code: 'SO-SH',
      },
      {
        name: 'Sool',
        code: 'SO-SO',
      },
      {
        name: 'Togdheer',
        code: 'SO-TO',
      },
      {
        name: 'Woqooyi Galbeed',
        code: 'SO-WO',
      },
    ],
  },
  {
    name: 'South Africa',
    code: 'ZA',
    provinces: [
      {
        name: 'Eastern Cape',
        code: 'ZA-EC',
      },
      {
        name: 'Free State',
        code: 'ZA-FS',
      },
      {
        name: 'Gauteng',
        code: 'ZA-GT',
      },
      {
        name: 'KwaZulu-Natal',
        code: 'ZA-NL',
      },
      {
        name: 'Limpopo',
        code: 'ZA-LP',
      },
      {
        name: 'Mpumalanga',
        code: 'ZA-MP',
      },
      {
        name: 'North West',
        code: 'ZA-NW',
      },
      {
        name: 'Northern Cape',
        code: 'ZA-NC',
      },
      {
        name: 'Western Cape',
        code: 'ZA-WC',
      },
    ],
  },
  //   { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  {
    name: 'Spain',
    code: 'ES',
    provinces: [
      {
        name: 'A Coruña',
        code: 'ES-C',
        subdivision: 'Province',
      },
      {
        name: 'Albacete',
        code: 'ES-AB',
        subdivision: 'Province',
      },
      {
        name: 'Alicante',
        code: 'ES-A',
        subdivision: 'Province',
      },
      {
        name: 'Almería',
        code: 'ES-AL',
        subdivision: 'Province',
      },
      {
        name: 'Asturias',
        code: 'ES-O',
        subdivision: 'Province',
      },
      {
        name: 'Badajoz',
        code: 'ES-BA',
        subdivision: 'Province',
      },
      {
        name: 'Balears',
        code: 'ES-PM',
        subdivision: 'Province',
      },
      {
        name: 'Barcelona',
        code: 'ES-B',
        subdivision: 'Province',
      },
      {
        name: 'Burgos',
        code: 'ES-BU',
        subdivision: 'Province',
      },
      {
        name: 'Cantabria',
        code: 'ES-S',
        subdivision: 'Province',
      },
      {
        name: 'Castellón',
        code: 'ES-CS',
        subdivision: 'Province',
      },
      {
        name: 'Ciudad Real',
        code: 'ES-CR',
        subdivision: 'Province',
      },
      {
        name: 'Cuenca',
        code: 'ES-CU',
        subdivision: 'Province',
      },
      {
        name: 'Cáceres',
        code: 'ES-CC',
        subdivision: 'Province',
      },
      {
        name: 'Cádiz',
        code: 'ES-CA',
        subdivision: 'Province',
      },
      {
        name: 'Córdoba',
        code: 'ES-CO',
        subdivision: 'Province',
      },
      {
        name: 'Girona',
        code: 'ES-GI',
        subdivision: 'Province',
      },
      {
        name: 'Granada',
        code: 'ES-GR',
        subdivision: 'Province',
      },
      {
        name: 'Guadalajara',
        code: 'ES-GU',
        subdivision: 'Province',
      },
      {
        name: 'Guipúzcoa',
        code: 'ES-SS',
        subdivision: 'Province',
      },
      {
        name: 'Huelva',
        code: 'ES-H',
        subdivision: 'Province',
      },
      {
        name: 'Huesca',
        code: 'ES-HU',
        subdivision: 'Province',
      },
      {
        name: 'Jaén',
        code: 'ES-J',
        subdivision: 'Province',
      },
      {
        name: 'La Rioja',
        code: 'ES-LO',
        subdivision: 'Province',
      },
      {
        name: 'Las Palmas',
        code: 'ES-GC',
        subdivision: 'Province',
      },
      {
        name: 'León',
        code: 'ES-LE',
        subdivision: 'Province',
      },
      {
        name: 'Lleida',
        code: 'ES-L',
        subdivision: 'Province',
      },
      {
        name: 'Lugo',
        code: 'ES-LU',
        subdivision: 'Province',
      },
      {
        name: 'Madrid',
        code: 'ES-M',
        subdivision: 'Province',
      },
      {
        name: 'Murcia',
        code: 'ES-MU',
        subdivision: 'Province',
      },
      {
        name: 'Málaga',
        code: 'ES-MA',
        subdivision: 'Province',
      },
      {
        name: 'Navarra',
        code: 'ES-NA',
        subdivision: 'Province',
      },
      {
        name: 'Ourense',
        code: 'ES-OR',
        subdivision: 'Province',
      },
      {
        name: 'Palencia',
        code: 'ES-P',
        subdivision: 'Province',
      },
      {
        name: 'Pontevedra',
        code: 'ES-PO',
        subdivision: 'Province',
      },
      {
        name: 'Salamanca',
        code: 'ES-SA',
        subdivision: 'Province',
      },
      {
        name: 'Santa Cruz de Tenerife',
        code: 'ES-TF',
        subdivision: 'Province',
      },
      {
        name: 'Segovia',
        code: 'ES-SG',
        subdivision: 'Province',
      },
      {
        name: 'Sevilla',
        code: 'ES-SE',
        subdivision: 'Province',
      },
      {
        name: 'Soria',
        code: 'ES-SO',
        subdivision: 'Province',
      },
      {
        name: 'Tarragona',
        code: 'ES-T',
        subdivision: 'Province',
      },
      {
        name: 'Teruel',
        code: 'ES-TE',
        subdivision: 'Province',
      },
      {
        name: 'Toledo',
        code: 'ES-TO',
        subdivision: 'Province',
      },
      {
        name: 'Valencia',
        code: 'ES-V',
        subdivision: 'Province',
      },
      {
        name: 'Valladolid',
        code: 'ES-VA',
        subdivision: 'Province',
      },
      {
        name: 'Vizcaya',
        code: 'ES-BI',
        subdivision: 'Province',
      },
      {
        name: 'Zamora',
        code: 'ES-ZA',
        subdivision: 'Province',
      },
      {
        name: 'Zaragoza',
        code: 'ES-Z',
        subdivision: 'Province',
      },
      {
        name: 'Álava',
        code: 'ES-VI',
        subdivision: 'Province',
      },
      {
        name: 'Ávila',
        code: 'ES-AV',
        subdivision: 'Province',
      },
      {
        name: 'Ceuta',
        code: 'ES-CE',
        subdivision: 'autonomous city in North Africa',
      },
      {
        name: 'Melilla',
        code: 'ES-ML',
        subdivision: 'autonomous city in North Africa',
      },
      {
        name: 'Andalucía',
        code: 'ES-AN',
        subdivision: 'autonomous community',
      },
      {
        name: 'Aragón',
        code: 'ES-AR',
        subdivision: 'autonomous community',
      },
      {
        name: 'Asturias, Principado de',
        code: 'ES-AS',
        subdivision: 'autonomous community',
      },
      {
        name: 'Canarias',
        code: 'ES-CN',
        subdivision: 'autonomous community',
      },
      {
        name: 'Cantabria',
        code: 'ES-CB',
        subdivision: 'autonomous community',
      },
      {
        name: 'Castilla y León',
        code: 'ES-CL',
        subdivision: 'autonomous community',
      },
      {
        name: 'Castilla-La Mancha',
        code: 'ES-CM',
        subdivision: 'autonomous community',
      },
      {
        name: 'Catalunya',
        code: 'ES-CT',
        subdivision: 'autonomous community',
      },
      {
        name: 'Extremadura',
        code: 'ES-EX',
        subdivision: 'autonomous community',
      },
      {
        name: 'Galicia',
        code: 'ES-GA',
        subdivision: 'autonomous community',
      },
      {
        name: 'Illes Balears',
        code: 'ES-IB',
        subdivision: 'autonomous community',
      },
      {
        name: 'La Rioja',
        code: 'ES-RI',
        subdivision: 'autonomous community',
      },
      {
        name: 'Madrid, Comunidad de',
        code: 'ES-MD',
        subdivision: 'autonomous community',
      },
      {
        name: 'Murcia, Región de',
        code: 'ES-MC',
        subdivision: 'autonomous community',
      },
      {
        name: 'Navarra, Comunidad Foral de',
        code: 'ES-NC',
        subdivision: 'autonomous community',
      },
      {
        name: 'País Vasco',
        code: 'ES-PV',
        subdivision: 'autonomous community',
      },
      {
        name: 'Valenciana, Comunidad',
        code: 'ES-VC',
        subdivision: 'autonomous community',
      },
    ],
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    provinces: [
      {
        name: 'Central Province',
        code: 'LK-2',
      },
      {
        name: 'Eastern Province',
        code: 'LK-5',
      },
      {
        name: 'North Central Province',
        code: 'LK-7',
      },
      {
        name: 'North Western Province',
        code: 'LK-6',
      },
      {
        name: 'Northern Province',
        code: 'LK-4',
      },
      {
        name: 'Sabaragamuwa Province',
        code: 'LK-9',
      },
      {
        name: 'Southern Province',
        code: 'LK-3',
      },
      {
        name: 'Uva Province',
        code: 'LK-8',
      },
      {
        name: 'Western Province',
        code: 'LK-1',
      },
    ],
  },
  {
    name: 'Sudan',
    code: 'SD',
    provinces: [
      {
        name: 'Al Baḩr al Aḩmar',
        code: 'SD-RS',
      },
      {
        name: 'Al Jazīrah',
        code: 'SD-GZ',
      },
      {
        name: 'Al Kharţūm',
        code: 'SD-KH',
      },
      {
        name: 'Al Qaḑārif',
        code: 'SD-GD',
      },
      {
        name: 'An Nīl',
        code: 'SD-NR',
      },
      {
        name: 'An Nīl al Abyaḑ',
        code: 'SD-NW',
      },
      {
        name: 'An Nīl al Azraq',
        code: 'SD-NB',
      },
      {
        name: 'Ash Shamālīyah',
        code: 'SD-NO',
      },
      {
        name: 'Gharb Dārfūr',
        code: 'SD-DW',
      },
      {
        name: 'Janūb Dārfūr',
        code: 'SD-DS',
      },
      {
        name: 'Janūb Kurdufān',
        code: 'SD-KS',
      },
      {
        name: 'Kassalā',
        code: 'SD-KA',
      },
      {
        name: 'Shamāl Dārfūr',
        code: 'SD-DN',
      },
      {
        name: 'Shamāl Kurdufān',
        code: 'SD-KN',
      },
      {
        name: 'Sharq Dārfūr',
        code: 'SD-DE',
      },
      {
        name: 'Sinnār',
        code: 'SD-SI',
      },
      {
        name: 'Zalingei',
        code: 'SD-DC',
      },
    ],
  },
  {
    name: 'Suriname',
    code: 'SR',
    provinces: [
      {
        name: 'Brokopondo',
        code: 'SR-BR',
      },
      {
        name: 'Commewijne',
        code: 'SR-CM',
      },
      {
        name: 'Coronie',
        code: 'SR-CR',
      },
      {
        name: 'Marowijne',
        code: 'SR-MA',
      },
      {
        name: 'Nickerie',
        code: 'SR-NI',
      },
      {
        name: 'Para',
        code: 'SR-PR',
      },
      {
        name: 'Paramaribo',
        code: 'SR-PM',
      },
      {
        name: 'Saramacca',
        code: 'SR-SA',
      },
      {
        name: 'Sipaliwini',
        code: 'SR-SI',
      },
      {
        name: 'Wanica',
        code: 'SR-WA',
      },
    ],
  },
  //   { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  {
    name: 'Swaziland',
    code: 'SZ',
    provinces: [
      {
        name: 'Hhohho',
        code: 'SZ-HH',
      },
      {
        name: 'Lubombo',
        code: 'SZ-LU',
      },
      {
        name: 'Manzini',
        code: 'SZ-MA',
      },
      {
        name: 'Shiselweni',
        code: 'SZ-SH',
      },
    ],
  },
  {
    name: 'Sweden',
    code: 'SE',
    provinces: [
      {
        name: 'Blekinge län',
        code: 'SE-K',
      },
      {
        name: 'Dalarnas län',
        code: 'SE-W',
      },
      {
        name: 'Gotlands län',
        code: 'SE-I',
      },
      {
        name: 'Gävleborgs län',
        code: 'SE-X',
      },
      {
        name: 'Hallands län',
        code: 'SE-N',
      },
      {
        name: 'Jämtlands län',
        code: 'SE-Z',
      },
      {
        name: 'Jönköpings län',
        code: 'SE-F',
      },
      {
        name: 'Kalmar län',
        code: 'SE-H',
      },
      {
        name: 'Kronobergs län',
        code: 'SE-G',
      },
      {
        name: 'Norrbottens län',
        code: 'SE-BD',
      },
      {
        name: 'Skåne län',
        code: 'SE-M',
      },
      {
        name: 'Stockholms län',
        code: 'SE-AB',
      },
      {
        name: 'Södermanlands län',
        code: 'SE-D',
      },
      {
        name: 'Uppsala län',
        code: 'SE-C',
      },
      {
        name: 'Värmlands län',
        code: 'SE-S',
      },
      {
        name: 'Västerbottens län',
        code: 'SE-AC',
      },
      {
        name: 'Västernorrlands län',
        code: 'SE-Y',
      },
      {
        name: 'Västmanlands län',
        code: 'SE-U',
      },
      {
        name: 'Västra Götalands län',
        code: 'SE-O',
      },
      {
        name: 'Örebro län',
        code: 'SE-T',
      },
      {
        name: 'Östergötlands län',
        code: 'SE-E',
      },
    ],
  },
  {
    name: 'Switzerland',
    code: 'CH',
    provinces: [
      {
        name: 'Aargau',
        code: 'CH-AG',
      },
      {
        name: 'Appenzell Ausserrhoden',
        code: 'CH-AR',
      },
      {
        name: 'Appenzell Innerrhoden',
        code: 'CH-AI',
      },
      {
        name: 'Basel-Landschaft',
        code: 'CH-BL',
      },
      {
        name: 'Basel-Stadt',
        code: 'CH-BS',
      },
      {
        name: 'Bern',
        code: 'CH-BE',
      },
      {
        name: 'Fribourg',
        code: 'CH-FR',
      },
      {
        name: 'Genève',
        code: 'CH-GE',
      },
      {
        name: 'Glarus',
        code: 'CH-GL',
      },
      {
        name: 'Graubünden',
        code: 'CH-GR',
      },
      {
        name: 'Jura',
        code: 'CH-JU',
      },
      {
        name: 'Luzern',
        code: 'CH-LU',
      },
      {
        name: 'Neuchâtel',
        code: 'CH-NE',
      },
      {
        name: 'Nidwalden',
        code: 'CH-NW',
      },
      {
        name: 'Obwalden',
        code: 'CH-OW',
      },
      {
        name: 'Sankt Gallen',
        code: 'CH-SG',
      },
      {
        name: 'Schaffhausen',
        code: 'CH-SH',
      },
      {
        name: 'Schwyz',
        code: 'CH-SZ',
      },
      {
        name: 'Solothurn',
        code: 'CH-SO',
      },
      {
        name: 'Thurgau',
        code: 'CH-TG',
      },
      {
        name: 'Ticino',
        code: 'CH-TI',
      },
      {
        name: 'Uri',
        code: 'CH-UR',
      },
      {
        name: 'Valais',
        code: 'CH-VS',
      },
      {
        name: 'Vaud',
        code: 'CH-VD',
      },
      {
        name: 'Zug',
        code: 'CH-ZG',
      },
      {
        name: 'Zürich',
        code: 'CH-ZH',
      },
    ],
  },
  {
    name: 'Syrian Arab Republic',
    code: 'SY',
    provinces: [
      {
        name: 'Al Lādhiqīyah',
        code: 'SY-LA',
      },
      {
        name: 'Al Qunayţirah',
        code: 'SY-QU',
      },
      {
        name: 'Al Ḩasakah',
        code: 'SY-HA',
      },
      {
        name: 'Ar Raqqah',
        code: 'SY-RA',
      },
      {
        name: "As Suwaydā'",
        code: 'SY-SU',
      },
      {
        name: 'Darٰā',
        code: 'SY-DR',
      },
      {
        name: 'Dayr az Zawr',
        code: 'SY-DY',
      },
      {
        name: 'Dimashq',
        code: 'SY-DI',
      },
      {
        name: 'Idlib',
        code: 'SY-ID',
      },
      {
        name: 'Rīf Dimashq',
        code: 'SY-RD',
      },
      {
        name: 'Ţarţūs',
        code: 'SY-TA',
      },
      {
        name: 'Ḩalab',
        code: 'SY-HL',
      },
      {
        name: 'Ḩamāh',
        code: 'SY-HM',
      },
      {
        name: 'Ḩimş',
        code: 'SY-HI',
      },
    ],
  },
  {
    name: 'Taiwan, Province of China',
    code: 'TW',
    provinces: [
      {
        name: 'Changhua',
        code: 'TW-CHA',
      },
      {
        name: 'Chiayi',
        code: 'TW-CYQ',
      },
      {
        name: 'Chiayi',
        code: 'TW-CYI',
      },
      {
        name: 'Hsinchu',
        code: 'TW-HSZ',
      },
      {
        name: 'Hsinchu',
        code: 'TW-HSQ',
      },
      {
        name: 'Hualien',
        code: 'TW-HUA',
      },
      {
        name: 'Ilan',
        code: 'TW-ILA',
      },
      {
        name: 'Kaohsiung',
        code: 'TW-KHQ',
      },
      {
        name: 'Kaohsiung',
        code: 'TW-KHH',
      },
      {
        name: 'Keelung',
        code: 'TW-KEE',
      },
      {
        name: 'Miaoli',
        code: 'TW-MIA',
      },
      {
        name: 'Nantou',
        code: 'TW-NAN',
      },
      {
        name: 'Penghu',
        code: 'TW-PEN',
      },
      {
        name: 'Pingtung',
        code: 'TW-PIF',
      },
      {
        name: 'Taichung',
        code: 'TW-TXG',
      },
      {
        name: 'Taichung',
        code: 'TW-TXQ',
      },
      {
        name: 'Tainan',
        code: 'TW-TNN',
      },
      {
        name: 'Tainan',
        code: 'TW-TNQ',
      },
      {
        name: 'Taipei',
        code: 'TW-TPE',
      },
      {
        name: 'Taipei',
        code: 'TW-TPQ',
      },
      {
        name: 'Taitung',
        code: 'TW-TTT',
      },
      {
        name: 'Taoyuan',
        code: 'TW-TAO',
      },
      {
        name: 'Yunlin',
        code: 'TW-YUN',
      },
    ],
  },
  {
    name: 'Tajikistan',
    code: 'TJ',
    provinces: [
      {
        name: 'Dushanbe',
        code: 'TJ-DU',
      },
      {
        name: 'Khatlon',
        code: 'TJ-KT',
      },
      {
        name: 'Kŭhistoni Badakhshon',
        code: 'TJ-GB',
      },
      {
        name: 'Sughd',
        code: 'TJ-SU',
      },
    ],
  },
  {
    name: 'Tanzania, United Republic of',
    code: 'TZ',
    provinces: [
      {
        name: 'Arusha',
        code: 'TZ-01',
      },
      {
        name: 'Dar es Salaam',
        code: 'TZ-02',
      },
      {
        name: 'Dodoma',
        code: 'TZ-03',
      },
      {
        name: 'Iringa',
        code: 'TZ-04',
      },
      {
        name: 'Kagera',
        code: 'TZ-05',
      },
      {
        name: 'Kaskazini Pemba',
        code: 'TZ-06',
      },
      {
        name: 'Kaskazini Unguja',
        code: 'TZ-07',
      },
      {
        name: 'Kigoma',
        code: 'TZ-08',
      },
      {
        name: 'Kilimanjaro',
        code: 'TZ-09',
      },
      {
        name: 'Kusini Pemba',
        code: 'TZ-10',
      },
      {
        name: 'Kusini Unguja',
        code: 'TZ-11',
      },
      {
        name: 'Lindi',
        code: 'TZ-12',
      },
      {
        name: 'Manyara',
        code: 'TZ-26',
      },
      {
        name: 'Mara',
        code: 'TZ-13',
      },
      {
        name: 'Mbeya',
        code: 'TZ-14',
      },
      {
        name: 'Mjini Magharibi',
        code: 'TZ-15',
      },
      {
        name: 'Morogoro',
        code: 'TZ-16',
      },
      {
        name: 'Mtwara',
        code: 'TZ-17',
      },
      {
        name: 'Mwanza',
        code: 'TZ-18',
      },
      {
        name: 'Pwani',
        code: 'TZ-19',
      },
      {
        name: 'Rukwa',
        code: 'TZ-20',
      },
      {
        name: 'Ruvuma',
        code: 'TZ-21',
      },
      {
        name: 'Shinyanga',
        code: 'TZ-22',
      },
      {
        name: 'Singida',
        code: 'TZ-23',
      },
      {
        name: 'Tabora',
        code: 'TZ-24',
      },
      {
        name: 'Tanga',
        code: 'TZ-25',
      },
    ],
  },
  {
    name: 'Thailand',
    code: 'TH',
    provinces: [
      {
        name: 'Amnat Charoen',
        code: 'TH-37',
      },
      {
        name: 'Ang Thong',
        code: 'TH-15',
      },
      {
        name: 'Bueng Kan',
        code: 'TH-38',
      },
      {
        name: 'Buri Ram',
        code: 'TH-31',
      },
      {
        name: 'Chachoengsao',
        code: 'TH-24',
      },
      {
        name: 'Chai Nat',
        code: 'TH-18',
      },
      {
        name: 'Chaiyaphum',
        code: 'TH-36',
      },
      {
        name: 'Chanthaburi',
        code: 'TH-22',
      },
      {
        name: 'Chiang Mai',
        code: 'TH-50',
      },
      {
        name: 'Chiang Rai',
        code: 'TH-57',
      },
      {
        name: 'Chon Buri',
        code: 'TH-20',
      },
      {
        name: 'Chumphon',
        code: 'TH-86',
      },
      {
        name: 'Kalasin',
        code: 'TH-46',
      },
      {
        name: 'Kamphaeng Phet',
        code: 'TH-62',
      },
      {
        name: 'Kanchanaburi',
        code: 'TH-71',
      },
      {
        name: 'Khon Kaen',
        code: 'TH-40',
      },
      {
        name: 'Krabi',
        code: 'TH-81',
      },
      {
        name: 'Krung Thep Maha Nakhon',
        code: 'TH-10',
      },
      {
        name: 'Lampang',
        code: 'TH-52',
      },
      {
        name: 'Lamphun',
        code: 'TH-51',
      },
      {
        name: 'Loei',
        code: 'TH-42',
      },
      {
        name: 'Lop Buri',
        code: 'TH-16',
      },
      {
        name: 'Mae Hong Son',
        code: 'TH-58',
      },
      {
        name: 'Maha Sarakham',
        code: 'TH-44',
      },
      {
        name: 'Mukdahan',
        code: 'TH-49',
      },
      {
        name: 'Nakhon Nayok',
        code: 'TH-26',
      },
      {
        name: 'Nakhon Pathom',
        code: 'TH-73',
      },
      {
        name: 'Nakhon Phanom',
        code: 'TH-48',
      },
      {
        name: 'Nakhon Ratchasima',
        code: 'TH-30',
      },
      {
        name: 'Nakhon Sawan',
        code: 'TH-60',
      },
      {
        name: 'Nakhon Si Thammarat',
        code: 'TH-80',
      },
      {
        name: 'Nan',
        code: 'TH-55',
      },
      {
        name: 'Narathiwat',
        code: 'TH-96',
      },
      {
        name: 'Nong Bua Lam Phu',
        code: 'TH-39',
      },
      {
        name: 'Nong Khai',
        code: 'TH-43',
      },
      {
        name: 'Nonthaburi',
        code: 'TH-12',
      },
      {
        name: 'Pathum Thani',
        code: 'TH-13',
      },
      {
        name: 'Pattani',
        code: 'TH-94',
      },
      {
        name: 'Phangnga',
        code: 'TH-82',
      },
      {
        name: 'Phatthalung',
        code: 'TH-93',
      },
      {
        name: 'Phatthaya',
        code: 'TH-S',
      },
      {
        name: 'Phayao',
        code: 'TH-56',
      },
      {
        name: 'Phetchabun',
        code: 'TH-67',
      },
      {
        name: 'Phetchaburi',
        code: 'TH-76',
      },
      {
        name: 'Phichit',
        code: 'TH-66',
      },
      {
        name: 'Phitsanulok',
        code: 'TH-65',
      },
      {
        name: 'Phra Nakhon Si Ayutthaya',
        code: 'TH-14',
      },
      {
        name: 'Phrae',
        code: 'TH-54',
      },
      {
        name: 'Phuket',
        code: 'TH-83',
      },
      {
        name: 'Prachin Buri',
        code: 'TH-25',
      },
      {
        name: 'Prachuap Khiri Khan',
        code: 'TH-77',
      },
      {
        name: 'Ranong',
        code: 'TH-85',
      },
      {
        name: 'Ratchaburi',
        code: 'TH-70',
      },
      {
        name: 'Rayong',
        code: 'TH-21',
      },
      {
        name: 'Roi Et',
        code: 'TH-45',
      },
      {
        name: 'Sa Kaeo',
        code: 'TH-27',
      },
      {
        name: 'Sakon Nakhon',
        code: 'TH-47',
      },
      {
        name: 'Samut Prakan',
        code: 'TH-11',
      },
      {
        name: 'Samut Sakhon',
        code: 'TH-74',
      },
      {
        name: 'Samut Songkhram',
        code: 'TH-75',
      },
      {
        name: 'Saraburi',
        code: 'TH-19',
      },
      {
        name: 'Satun',
        code: 'TH-91',
      },
      {
        name: 'Si Sa Ket',
        code: 'TH-33',
      },
      {
        name: 'Sing Buri',
        code: 'TH-17',
      },
      {
        name: 'Songkhla',
        code: 'TH-90',
      },
      {
        name: 'Sukhothai',
        code: 'TH-64',
      },
      {
        name: 'Suphan Buri',
        code: 'TH-72',
      },
      {
        name: 'Surat Thani',
        code: 'TH-84',
      },
      {
        name: 'Surin',
        code: 'TH-32',
      },
      {
        name: 'Tak',
        code: 'TH-63',
      },
      {
        name: 'Trang',
        code: 'TH-92',
      },
      {
        name: 'Trat',
        code: 'TH-23',
      },
      {
        name: 'Ubon Ratchathani',
        code: 'TH-34',
      },
      {
        name: 'Udon Thani',
        code: 'TH-41',
      },
      {
        name: 'Uthai Thani',
        code: 'TH-61',
      },
      {
        name: 'Uttaradit',
        code: 'TH-53',
      },
      {
        name: 'Yala',
        code: 'TH-95',
      },
      {
        name: 'Yasothon',
        code: 'TH-35',
      },
    ],
  },
  {
    name: 'Timor-Leste',
    code: 'TL',
    provinces: [
      {
        name: 'Aileu',
        code: 'TL-AL',
      },
      {
        name: 'Ainaro',
        code: 'TL-AN',
      },
      {
        name: 'Baucau',
        code: 'TL-BA',
      },
      {
        name: 'Bobonaro',
        code: 'TL-BO',
      },
      {
        name: 'Cova Lima',
        code: 'TL-CO',
      },
      {
        name: 'Díli',
        code: 'TL-DI',
      },
      {
        name: 'Ermera',
        code: 'TL-ER',
      },
      {
        name: 'Lautem',
        code: 'TL-LA',
      },
      {
        name: 'Liquiça',
        code: 'TL-LI',
      },
      {
        name: 'Manatuto',
        code: 'TL-MT',
      },
      {
        name: 'Manufahi',
        code: 'TL-MF',
      },
      {
        name: 'Oecussi',
        code: 'TL-OE',
      },
      {
        name: 'Viqueque',
        code: 'TL-VI',
      },
    ],
  },
  {
    name: 'Togo',
    code: 'TG',
    provinces: [
      {
        name: 'Centre',
        code: 'TG-C',
      },
      {
        name: 'Kara',
        code: 'TG-K',
      },
      {
        name: 'Maritime',
        code: 'TG-M',
      },
      {
        name: 'Plateaux',
        code: 'TG-P',
      },
      {
        name: 'Savannes',
        code: 'TG-S',
      },
    ],
  },
  //   { name: 'Tokelau', code: 'TK' },
  {
    name: 'Tonga',
    code: 'TO',
    provinces: [
      {
        name: "'Eua",
        code: 'TO-01',
      },
      {
        name: "Ha'apai",
        code: 'TO-02',
      },
      {
        name: 'Niuas',
        code: 'TO-03',
      },
      {
        name: 'Tongatapu',
        code: 'TO-04',
      },
      {
        name: "Vava'u",
        code: 'TO-05',
      },
    ],
  },
  {
    name: 'Trinidad and Tobago',
    code: 'TT',
    provinces: [
      {
        name: 'Arima',
        code: 'TT-ARI',
      },
      {
        name: 'Chaguanas',
        code: 'TT-CHA',
      },
      {
        name: 'Couva-Tabaquite-Talparo',
        code: 'TT-CTT',
      },
      {
        name: 'Diego Martin',
        code: 'TT-DMN',
      },
      {
        name: 'Eastern Tobago',
        code: 'TT-ETO',
      },
      {
        name: 'Penal-Debe',
        code: 'TT-PED',
      },
      {
        name: 'Point Fortin',
        code: 'TT-PTF',
      },
      {
        name: 'Port of Spain',
        code: 'TT-POS',
      },
      {
        name: 'Princes Town',
        code: 'TT-PRT',
      },
      {
        name: 'Rio Claro-Mayaro',
        code: 'TT-RCM',
      },
      {
        name: 'San Fernando',
        code: 'TT-SFO',
      },
      {
        name: 'San Juan-Laventille',
        code: 'TT-SJL',
      },
      {
        name: 'Sangre Grande',
        code: 'TT-SGE',
      },
      {
        name: 'Siparia',
        code: 'TT-SIP',
      },
      {
        name: 'Tunapuna-Piarco',
        code: 'TT-TUP',
      },
      {
        name: 'Western Tobago',
        code: 'TT-WTO',
      },
    ],
  },
  {
    name: 'Tunisia',
    code: 'TN',
    provinces: [
      {
        name: 'Ariana',
        code: 'TN-12',
      },
      {
        name: 'Ben Arous',
        code: 'TN-13',
      },
      {
        name: 'Bizerte',
        code: 'TN-23',
      },
      {
        name: 'Béja',
        code: 'TN-31',
      },
      {
        name: 'Gabès',
        code: 'TN-81',
      },
      {
        name: 'Gafsa',
        code: 'TN-71',
      },
      {
        name: 'Jendouba',
        code: 'TN-32',
      },
      {
        name: 'Kairouan',
        code: 'TN-41',
      },
      {
        name: 'Kasserine',
        code: 'TN-42',
      },
      {
        name: 'Kebili',
        code: 'TN-73',
      },
      {
        name: 'La Manouba',
        code: 'TN-14',
      },
      {
        name: 'Le Kef',
        code: 'TN-33',
      },
      {
        name: 'Mahdia',
        code: 'TN-53',
      },
      {
        name: 'Medenine',
        code: 'TN-82',
      },
      {
        name: 'Monastir',
        code: 'TN-52',
      },
      {
        name: 'Nabeul',
        code: 'TN-21',
      },
      {
        name: 'Sfax',
        code: 'TN-61',
      },
      {
        name: 'Sidi Bouzid',
        code: 'TN-43',
      },
      {
        name: 'Siliana',
        code: 'TN-34',
      },
      {
        name: 'Sousse',
        code: 'TN-51',
      },
      {
        name: 'Tataouine',
        code: 'TN-83',
      },
      {
        name: 'Tozeur',
        code: 'TN-72',
      },
      {
        name: 'Tunis',
        code: 'TN-11',
      },
      {
        name: 'Zaghouan',
        code: 'TN-22',
      },
    ],
  },
  {
    name: 'Turkey',
    code: 'TR',
    provinces: [
      {
        name: 'Adana',
        code: 'TR-01',
      },
      {
        name: 'Adıyaman',
        code: 'TR-02',
      },
      {
        name: 'Afyonkarahisar',
        code: 'TR-03',
      },
      {
        name: 'Aksaray',
        code: 'TR-68',
      },
      {
        name: 'Amasya',
        code: 'TR-05',
      },
      {
        name: 'Ankara',
        code: 'TR-06',
      },
      {
        name: 'Antalya',
        code: 'TR-07',
      },
      {
        name: 'Ardahan',
        code: 'TR-75',
      },
      {
        name: 'Artvin',
        code: 'TR-08',
      },
      {
        name: 'Aydın',
        code: 'TR-09',
      },
      {
        name: 'Ağrı',
        code: 'TR-04',
      },
      {
        name: 'Balıkesir',
        code: 'TR-10',
      },
      {
        name: 'Bartın',
        code: 'TR-74',
      },
      {
        name: 'Batman',
        code: 'TR-72',
      },
      {
        name: 'Bayburt',
        code: 'TR-69',
      },
      {
        name: 'Bilecik',
        code: 'TR-11',
      },
      {
        name: 'Bingöl',
        code: 'TR-12',
      },
      {
        name: 'Bitlis',
        code: 'TR-13',
      },
      {
        name: 'Bolu',
        code: 'TR-14',
      },
      {
        name: 'Burdur',
        code: 'TR-15',
      },
      {
        name: 'Bursa',
        code: 'TR-16',
      },
      {
        name: 'Denizli',
        code: 'TR-20',
      },
      {
        name: 'Diyarbakır',
        code: 'TR-21',
      },
      {
        name: 'Düzce',
        code: 'TR-81',
      },
      {
        name: 'Edirne',
        code: 'TR-22',
      },
      {
        name: 'Elazığ',
        code: 'TR-23',
      },
      {
        name: 'Erzincan',
        code: 'TR-24',
      },
      {
        name: 'Erzurum',
        code: 'TR-25',
      },
      {
        name: 'Eskişehir',
        code: 'TR-26',
      },
      {
        name: 'Gaziantep',
        code: 'TR-27',
      },
      {
        name: 'Giresun',
        code: 'TR-28',
      },
      {
        name: 'Gümüşhane',
        code: 'TR-29',
      },
      {
        name: 'Hakkâri',
        code: 'TR-30',
      },
      {
        name: 'Hatay',
        code: 'TR-31',
      },
      {
        name: 'Isparta',
        code: 'TR-32',
      },
      {
        name: 'Iğdır',
        code: 'TR-76',
      },
      {
        name: 'Kahramanmaraş',
        code: 'TR-46',
      },
      {
        name: 'Karabük',
        code: 'TR-78',
      },
      {
        name: 'Karaman',
        code: 'TR-70',
      },
      {
        name: 'Kars',
        code: 'TR-36',
      },
      {
        name: 'Kastamonu',
        code: 'TR-37',
      },
      {
        name: 'Kayseri',
        code: 'TR-38',
      },
      {
        name: 'Kilis',
        code: 'TR-79',
      },
      {
        name: 'Kocaeli',
        code: 'TR-41',
      },
      {
        name: 'Konya',
        code: 'TR-42',
      },
      {
        name: 'Kütahya',
        code: 'TR-43',
      },
      {
        name: 'Kırklareli',
        code: 'TR-39',
      },
      {
        name: 'Kırıkkale',
        code: 'TR-71',
      },
      {
        name: 'Kırşehir',
        code: 'TR-40',
      },
      {
        name: 'Malatya',
        code: 'TR-44',
      },
      {
        name: 'Manisa',
        code: 'TR-45',
      },
      {
        name: 'Mardin',
        code: 'TR-47',
      },
      {
        name: 'Mersin',
        code: 'TR-33',
      },
      {
        name: 'Muğla',
        code: 'TR-48',
      },
      {
        name: 'Muş',
        code: 'TR-49',
      },
      {
        name: 'Nevşehir',
        code: 'TR-50',
      },
      {
        name: 'Niğde',
        code: 'TR-51',
      },
      {
        name: 'Ordu',
        code: 'TR-52',
      },
      {
        name: 'Osmaniye',
        code: 'TR-80',
      },
      {
        name: 'Rize',
        code: 'TR-53',
      },
      {
        name: 'Sakarya',
        code: 'TR-54',
      },
      {
        name: 'Samsun',
        code: 'TR-55',
      },
      {
        name: 'Siirt',
        code: 'TR-56',
      },
      {
        name: 'Sinop',
        code: 'TR-57',
      },
      {
        name: 'Sivas',
        code: 'TR-58',
      },
      {
        name: 'Tekirdağ',
        code: 'TR-59',
      },
      {
        name: 'Tokat',
        code: 'TR-60',
      },
      {
        name: 'Trabzon',
        code: 'TR-61',
      },
      {
        name: 'Tunceli',
        code: 'TR-62',
      },
      {
        name: 'Uşak',
        code: 'TR-64',
      },
      {
        name: 'Van',
        code: 'TR-65',
      },
      {
        name: 'Yalova',
        code: 'TR-77',
      },
      {
        name: 'Yozgat',
        code: 'TR-66',
      },
      {
        name: 'Zonguldak',
        code: 'TR-67',
      },
      {
        name: 'Çanakkale',
        code: 'TR-17',
      },
      {
        name: 'Çankırı',
        code: 'TR-18',
      },
      {
        name: 'Çorum',
        code: 'TR-19',
      },
      {
        name: 'İstanbul',
        code: 'TR-34',
      },
      {
        name: 'İzmir',
        code: 'TR-35',
      },
      {
        name: 'Şanlıurfa',
        code: 'TR-63',
      },
      {
        name: 'Şırnak',
        code: 'TR-73',
      },
    ],
  },
  {
    name: 'Turkmenistan',
    code: 'TM',
    provinces: [
      {
        name: 'Ahal',
        code: 'TM-A',
      },
      {
        name: 'Aşgabat',
        code: 'TM-S',
      },
      {
        name: 'Balkan',
        code: 'TM-B',
      },
      {
        name: 'Daşoguz',
        code: 'TM-D',
      },
      {
        name: 'Lebap',
        code: 'TM-L',
      },
      {
        name: 'Mary',
        code: 'TM-M',
      },
    ],
  },
  //   { name: 'Turks and Caicos Islands', code: 'TC' },
  {
    name: 'Tuvalu',
    code: 'TV',
    provinces: [
      {
        name: 'Funafuti',
        code: 'TV-FUN',
      },
      {
        name: 'Nanumanga',
        code: 'TV-NMG',
      },
      {
        name: 'Nanumea',
        code: 'TV-NMA',
      },
      {
        name: 'Niutao',
        code: 'TV-NIT',
      },
      {
        name: 'Nui',
        code: 'TV-NUI',
      },
      {
        name: 'Nukufetau',
        code: 'TV-NKF',
      },
      {
        name: 'Nukulaelae',
        code: 'TV-NKL',
      },
      {
        name: 'Vaitupu',
        code: 'TV-VAI',
      },
    ],
  },
  {
    name: 'Uganda',
    code: 'UG',
    provinces: [
      {
        name: 'Central',
        code: 'UG-C',
      },
      {
        name: 'Eastern',
        code: 'UG-E',
      },
      {
        name: 'Northern',
        code: 'UG-N',
      },
      {
        name: 'Western',
        code: 'UG-W',
      },
    ],
  },
  {
    name: 'Ukraine',
    code: 'UA',
    provinces: [
      {
        name: 'Avtonomna Respublika Krym',
        code: 'UA-43',
      },
      {
        name: "Cherkas'ka Oblast'",
        code: 'UA-71',
      },
      {
        name: "Chernihivs'ka Oblast'",
        code: 'UA-74',
      },
      {
        name: "Chernivets'ka Oblast'",
        code: 'UA-77',
      },
      {
        name: "Dnipropetrovs'ka Oblast'",
        code: 'UA-12',
      },
      {
        name: "Donets'ka Oblast'",
        code: 'UA-14',
      },
      {
        name: "Ivano-Frankivs'ka Oblast'",
        code: 'UA-26',
      },
      {
        name: "Kharkivs'ka Oblast'",
        code: 'UA-63',
      },
      {
        name: "Khersons'ka Oblast'",
        code: 'UA-65',
      },
      {
        name: "Khmel'nyts'ka Oblast'",
        code: 'UA-68',
      },
      {
        name: "Kirovohrads'ka Oblast'",
        code: 'UA-35',
      },
      {
        name: 'Kyïv',
        code: 'UA-30',
      },
      {
        name: "Kyïvs'ka Oblast'",
        code: 'UA-32',
      },
      {
        name: "L'vivs'ka Oblast'",
        code: 'UA-46',
      },
      {
        name: "Luhans'ka Oblast'",
        code: 'UA-09',
      },
      {
        name: "Mykolaïvs'ka Oblast'",
        code: 'UA-48',
      },
      {
        name: "Odes'ka Oblast'",
        code: 'UA-51',
      },
      {
        name: "Poltavs'ka Oblast'",
        code: 'UA-53',
      },
      {
        name: "Rivnens'ka Oblast'",
        code: 'UA-56',
      },
      {
        name: "Sevastopol'",
        code: 'UA-40',
      },
      {
        name: "Sums'ka Oblast'",
        code: 'UA-59',
      },
      {
        name: "Ternopil's'ka Oblast'",
        code: 'UA-61',
      },
      {
        name: "Vinnyts'ka Oblast'",
        code: 'UA-05',
      },
      {
        name: "Volyns'ka Oblast'",
        code: 'UA-07',
      },
      {
        name: "Zakarpats'ka Oblast'",
        code: 'UA-21',
      },
      {
        name: "Zaporiz'ka Oblast'",
        code: 'UA-23',
      },
      {
        name: "Zhytomyrs'ka Oblast'",
        code: 'UA-18',
      },
    ],
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    provinces: [
      {
        name: "'Ajmān",
        code: 'AE-AJ',
      },
      {
        name: 'Abū Z̧aby',
        code: 'AE-AZ',
      },
      {
        name: 'Al Fujayrah',
        code: 'AE-FU',
      },
      {
        name: 'Ash Shāriqah',
        code: 'AE-SH',
      },
      {
        name: 'Dubayy',
        code: 'AE-DU',
      },
      {
        name: "Ra's al Khaymah",
        code: 'AE-RK',
      },
      {
        name: 'Umm al Qaywayn',
        code: 'AE-UQ',
      },
    ],
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    provinces: [
      {
        name: 'Barking and Dagenham',
        code: 'GB-BDG',
        subdivision: 'London borough',
      },
      {
        name: 'Barnet',
        code: 'GB-BNE',
        subdivision: 'London borough',
      },
      {
        name: 'Bexley',
        code: 'GB-BEX',
        subdivision: 'London borough',
      },
      {
        name: 'Brent',
        code: 'GB-BEN',
        subdivision: 'London borough',
      },
      {
        name: 'Bromley',
        code: 'GB-BRY',
        subdivision: 'London borough',
      },
      {
        name: 'Camden',
        code: 'GB-CMD',
        subdivision: 'London borough',
      },
      {
        name: 'Croydon',
        code: 'GB-CRY',
        subdivision: 'London borough',
      },
      {
        name: 'Ealing',
        code: 'GB-EAL',
        subdivision: 'London borough',
      },
      {
        name: 'Enfield',
        code: 'GB-ENF',
        subdivision: 'London borough',
      },
      {
        name: 'Greenwich',
        code: 'GB-GRE',
        subdivision: 'London borough',
      },
      {
        name: 'Hackney',
        code: 'GB-HCK',
        subdivision: 'London borough',
      },
      {
        name: 'Hammersmith and Fulham',
        code: 'GB-HMF',
        subdivision: 'London borough',
      },
      {
        name: 'Haringey',
        code: 'GB-HRY',
        subdivision: 'London borough',
      },
      {
        name: 'Harrow',
        code: 'GB-HRW',
        subdivision: 'London borough',
      },
      {
        name: 'Havering',
        code: 'GB-HAV',
        subdivision: 'London borough',
      },
      {
        name: 'Hillingdon',
        code: 'GB-HIL',
        subdivision: 'London borough',
      },
      {
        name: 'Hounslow',
        code: 'GB-HNS',
        subdivision: 'London borough',
      },
      {
        name: 'Islington',
        code: 'GB-ISL',
        subdivision: 'London borough',
      },
      {
        name: 'Kensington and Chelsea',
        code: 'GB-KEC',
        subdivision: 'London borough',
      },
      {
        name: 'Kingston upon Thames',
        code: 'GB-KTT',
        subdivision: 'London borough',
      },
      {
        name: 'Lambeth',
        code: 'GB-LBH',
        subdivision: 'London borough',
      },
      {
        name: 'Lewisham',
        code: 'GB-LEW',
        subdivision: 'London borough',
      },
      {
        name: 'Merton',
        code: 'GB-MRT',
        subdivision: 'London borough',
      },
      {
        name: 'Newham',
        code: 'GB-NWM',
        subdivision: 'London borough',
      },
      {
        name: 'Redbridge',
        code: 'GB-RDB',
        subdivision: 'London borough',
      },
      {
        name: 'Richmond upon Thames',
        code: 'GB-RIC',
        subdivision: 'London borough',
      },
      {
        name: 'Southwark',
        code: 'GB-SWK',
        subdivision: 'London borough',
      },
      {
        name: 'Sutton',
        code: 'GB-STN',
        subdivision: 'London borough',
      },
      {
        name: 'Tower Hamlets',
        code: 'GB-TWH',
        subdivision: 'London borough',
      },
      {
        name: 'Waltham Forest',
        code: 'GB-WFT',
        subdivision: 'London borough',
      },
      {
        name: 'Wandsworth',
        code: 'GB-WND',
        subdivision: 'London borough',
      },
      {
        name: 'Westminster',
        code: 'GB-WSM',
        subdivision: 'London borough',
      },
      {
        name: 'England and Wales',
        code: 'GB-EAW',
        subdivision: 'Nation',
      },
      {
        name: 'Great Britain',
        code: 'GB-GBN',
        subdivision: 'Nation',
      },
      {
        name: 'United Kingdom',
        code: 'GB-UKM',
        subdivision: 'Nation',
      },
      {
        name: 'London, City of',
        code: 'GB-LND',
        subdivision: 'city corporation',
      },
      {
        name: 'Aberdeen City',
        code: 'GB-ABE',
        subdivision: 'council area',
      },
      {
        name: 'Aberdeenshire',
        code: 'GB-ABD',
        subdivision: 'council area',
      },
      {
        name: 'Angus',
        code: 'GB-ANS',
        subdivision: 'council area',
      },
      {
        name: 'Argyll and Bute',
        code: 'GB-AGB',
        subdivision: 'council area',
      },
      {
        name: 'Clackmannanshire',
        code: 'GB-CLK',
        subdivision: 'council area',
      },
      {
        name: 'Dumfries and Galloway',
        code: 'GB-DGY',
        subdivision: 'council area',
      },
      {
        name: 'Dundee City',
        code: 'GB-DND',
        subdivision: 'council area',
      },
      {
        name: 'East Ayrshire',
        code: 'GB-EAY',
        subdivision: 'council area',
      },
      {
        name: 'East Dunbartonshire',
        code: 'GB-EDU',
        subdivision: 'council area',
      },
      {
        name: 'East Lothian',
        code: 'GB-ELN',
        subdivision: 'council area',
      },
      {
        name: 'East Renfrewshire',
        code: 'GB-ERW',
        subdivision: 'council area',
      },
      {
        name: 'Edinburgh, City of',
        code: 'GB-EDH',
        subdivision: 'council area',
      },
      {
        name: 'Eilean Siar',
        code: 'GB-ELS',
        subdivision: 'council area',
      },
      {
        name: 'Falkirk',
        code: 'GB-FAL',
        subdivision: 'council area',
      },
      {
        name: 'Fife',
        code: 'GB-FIF',
        subdivision: 'council area',
      },
      {
        name: 'Glasgow City',
        code: 'GB-GLG',
        subdivision: 'council area',
      },
      {
        name: 'Highland',
        code: 'GB-HLD',
        subdivision: 'council area',
      },
      {
        name: 'Inverclyde',
        code: 'GB-IVC',
        subdivision: 'council area',
      },
      {
        name: 'Midlothian',
        code: 'GB-MLN',
        subdivision: 'council area',
      },
      {
        name: 'Moray',
        code: 'GB-MRY',
        subdivision: 'council area',
      },
      {
        name: 'North Ayrshire',
        code: 'GB-NAY',
        subdivision: 'council area',
      },
      {
        name: 'North Lanarkshire',
        code: 'GB-NLK',
        subdivision: 'council area',
      },
      {
        name: 'Orkney Islands',
        code: 'GB-ORK',
        subdivision: 'council area',
      },
      {
        name: 'Perth and Kinross',
        code: 'GB-PKN',
        subdivision: 'council area',
      },
      {
        name: 'Renfrewshire',
        code: 'GB-RFW',
        subdivision: 'council area',
      },
      {
        name: 'Scottish Borders, The',
        code: 'GB-SCB',
        subdivision: 'council area',
      },
      {
        name: 'Shetland Islands',
        code: 'GB-ZET',
        subdivision: 'council area',
      },
      {
        name: 'South Ayrshire',
        code: 'GB-SAY',
        subdivision: 'council area',
      },
      {
        name: 'South Lanarkshire',
        code: 'GB-SLK',
        subdivision: 'council area',
      },
      {
        name: 'Stirling',
        code: 'GB-STG',
        subdivision: 'council area',
      },
      {
        name: 'West Dunbartonshire',
        code: 'GB-WDU',
        subdivision: 'council area',
      },
      {
        name: 'West Lothian',
        code: 'GB-WLN',
        subdivision: 'council area',
      },
      {
        name: 'England',
        code: 'GB-ENG',
        subdivision: 'country',
      },
      {
        name: 'Scotland',
        code: 'GB-SCT',
        subdivision: 'country',
      },
      {
        name: 'Wales',
        code: 'GB-WLS',
        subdivision: 'country',
      },
      {
        name: 'Antrim',
        code: 'GB-ANT',
        subdivision: 'district council area',
      },
      {
        name: 'Ards',
        code: 'GB-ARD',
        subdivision: 'district council area',
      },
      {
        name: 'Armagh',
        code: 'GB-ARM',
        subdivision: 'district council area',
      },
      {
        name: 'Ballymena',
        code: 'GB-BLA',
        subdivision: 'district council area',
      },
      {
        name: 'Ballymoney',
        code: 'GB-BLY',
        subdivision: 'district council area',
      },
      {
        name: 'Banbridge',
        code: 'GB-BNB',
        subdivision: 'district council area',
      },
      {
        name: 'Belfast',
        code: 'GB-BFS',
        subdivision: 'district council area',
      },
      {
        name: 'Carrickfergus',
        code: 'GB-CKF',
        subdivision: 'district council area',
      },
      {
        name: 'Castlereagh',
        code: 'GB-CSR',
        subdivision: 'district council area',
      },
      {
        name: 'Coleraine',
        code: 'GB-CLR',
        subdivision: 'district council area',
      },
      {
        name: 'Cookstown',
        code: 'GB-CKT',
        subdivision: 'district council area',
      },
      {
        name: 'Craigavon',
        code: 'GB-CGV',
        subdivision: 'district council area',
      },
      {
        name: 'Derry',
        code: 'GB-DRY',
        subdivision: 'district council area',
      },
      {
        name: 'Down',
        code: 'GB-DOW',
        subdivision: 'district council area',
      },
      {
        name: 'Dungannon and South Tyrone',
        code: 'GB-DGN',
        subdivision: 'district council area',
      },
      {
        name: 'Fermanagh',
        code: 'GB-FER',
        subdivision: 'district council area',
      },
      {
        name: 'Larne',
        code: 'GB-LRN',
        subdivision: 'district council area',
      },
      {
        name: 'Limavady',
        code: 'GB-LMV',
        subdivision: 'district council area',
      },
      {
        name: 'Lisburn',
        code: 'GB-LSB',
        subdivision: 'district council area',
      },
      {
        name: 'Magherafelt',
        code: 'GB-MFT',
        subdivision: 'district council area',
      },
      {
        name: 'Moyle',
        code: 'GB-MYL',
        subdivision: 'district council area',
      },
      {
        name: 'Newry and Mourne District',
        code: 'GB-NYM',
        subdivision: 'district council area',
      },
      {
        name: 'Newtownabbey',
        code: 'GB-NTA',
        subdivision: 'district council area',
      },
      {
        name: 'North Down',
        code: 'GB-NDN',
        subdivision: 'district council area',
      },
      {
        name: 'Omagh',
        code: 'GB-OMH',
        subdivision: 'district council area',
      },
      {
        name: 'Strabane',
        code: 'GB-STB',
        subdivision: 'district council area',
      },
      {
        name: 'Barnsley',
        code: 'GB-BNS',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Birmingham',
        code: 'GB-BIR',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Bolton',
        code: 'GB-BOL',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Bradford',
        code: 'GB-BRD',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Bury',
        code: 'GB-BUR',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Calderdale',
        code: 'GB-CLD',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Coventry',
        code: 'GB-COV',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Doncaster',
        code: 'GB-DNC',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Dudley',
        code: 'GB-DUD',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Gateshead',
        code: 'GB-GAT',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Kirklees',
        code: 'GB-KIR',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Knowsley',
        code: 'GB-KWL',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Leeds',
        code: 'GB-LDS',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Liverpool',
        code: 'GB-LIV',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Manchester',
        code: 'GB-MAN',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Newcastle upon Tyne',
        code: 'GB-NET',
        subdivision: 'metropolitan district',
      },
      {
        name: 'North Tyneside',
        code: 'GB-NTY',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Oldham',
        code: 'GB-OLD',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Rochdale',
        code: 'GB-RCH',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Rotherham',
        code: 'GB-ROT',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Salford',
        code: 'GB-SLF',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Sandwell',
        code: 'GB-SAW',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Sefton',
        code: 'GB-SFT',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Sheffield',
        code: 'GB-SHF',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Solihull',
        code: 'GB-SOL',
        subdivision: 'metropolitan district',
      },
      {
        name: 'South Tyneside',
        code: 'GB-STY',
        subdivision: 'metropolitan district',
      },
      {
        name: 'St. Helens',
        code: 'GB-SHN',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Stockport',
        code: 'GB-SKP',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Sunderland',
        code: 'GB-SND',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Tameside',
        code: 'GB-TAM',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Trafford',
        code: 'GB-TRF',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Wakefield',
        code: 'GB-WKF',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Walsall',
        code: 'GB-WLL',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Wigan',
        code: 'GB-WGN',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Wirral',
        code: 'GB-WRL',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Wolverhampton',
        code: 'GB-WLV',
        subdivision: 'metropolitan district',
      },
      {
        name: 'Northern Ireland',
        code: 'GB-NIR',
        subdivision: 'province',
      },
      {
        name: 'Buckinghamshire',
        code: 'GB-BKM',
        subdivision: 'two-tier county',
      },
      {
        name: 'Cambridgeshire',
        code: 'GB-CAM',
        subdivision: 'two-tier county',
      },
      {
        name: 'Cumbria',
        code: 'GB-CMA',
        subdivision: 'two-tier county',
      },
      {
        name: 'Derbyshire',
        code: 'GB-DBY',
        subdivision: 'two-tier county',
      },
      {
        name: 'Devon',
        code: 'GB-DEV',
        subdivision: 'two-tier county',
      },
      {
        name: 'Dorset',
        code: 'GB-DOR',
        subdivision: 'two-tier county',
      },
      {
        name: 'East Sussex',
        code: 'GB-ESX',
        subdivision: 'two-tier county',
      },
      {
        name: 'Essex',
        code: 'GB-ESS',
        subdivision: 'two-tier county',
      },
      {
        name: 'Gloucestershire',
        code: 'GB-GLS',
        subdivision: 'two-tier county',
      },
      {
        name: 'Hampshire',
        code: 'GB-HAM',
        subdivision: 'two-tier county',
      },
      {
        name: 'Hertfordshire',
        code: 'GB-HRT',
        subdivision: 'two-tier county',
      },
      {
        name: 'Kent',
        code: 'GB-KEN',
        subdivision: 'two-tier county',
      },
      {
        name: 'Lancashire',
        code: 'GB-LAN',
        subdivision: 'two-tier county',
      },
      {
        name: 'Leicestershire',
        code: 'GB-LEC',
        subdivision: 'two-tier county',
      },
      {
        name: 'Lincolnshire',
        code: 'GB-LIN',
        subdivision: 'two-tier county',
      },
      {
        name: 'Norfolk',
        code: 'GB-NFK',
        subdivision: 'two-tier county',
      },
      {
        name: 'North Yorkshire',
        code: 'GB-NYK',
        subdivision: 'two-tier county',
      },
      {
        name: 'Northamptonshire',
        code: 'GB-NTH',
        subdivision: 'two-tier county',
      },
      {
        name: 'Nottinghamshire',
        code: 'GB-NTT',
        subdivision: 'two-tier county',
      },
      {
        name: 'Oxfordshire',
        code: 'GB-OXF',
        subdivision: 'two-tier county',
      },
      {
        name: 'Somerset',
        code: 'GB-SOM',
        subdivision: 'two-tier county',
      },
      {
        name: 'Staffordshire',
        code: 'GB-STS',
        subdivision: 'two-tier county',
      },
      {
        name: 'Suffolk',
        code: 'GB-SFK',
        subdivision: 'two-tier county',
      },
      {
        name: 'Surrey',
        code: 'GB-SRY',
        subdivision: 'two-tier county',
      },
      {
        name: 'Warwickshire',
        code: 'GB-WAR',
        subdivision: 'two-tier county',
      },
      {
        name: 'West Sussex',
        code: 'GB-WSX',
        subdivision: 'two-tier county',
      },
      {
        name: 'Worcestershire',
        code: 'GB-WOR',
        subdivision: 'two-tier county',
      },
      {
        name: 'Bath and North East Somerset',
        code: 'GB-BAS',
        subdivision: 'unitary authority',
      },
      {
        name: 'Bedford',
        code: 'GB-BDF',
        subdivision: 'unitary authority',
      },
      {
        name: 'Blackburn with Darwen',
        code: 'GB-BBD',
        subdivision: 'unitary authority',
      },
      {
        name: 'Blackpool',
        code: 'GB-BPL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Blaenau Gwent',
        code: 'GB-BGW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Bournemouth',
        code: 'GB-BMH',
        subdivision: 'unitary authority',
      },
      {
        name: 'Bracknell Forest',
        code: 'GB-BRC',
        subdivision: 'unitary authority',
      },
      {
        name: 'Bridgend',
        code: 'GB-BGE',
        subdivision: 'unitary authority',
      },
      {
        name: 'Brighton and Hove',
        code: 'GB-BNH',
        subdivision: 'unitary authority',
      },
      {
        name: 'Bristol, City of',
        code: 'GB-BST',
        subdivision: 'unitary authority',
      },
      {
        name: 'Caerphilly',
        code: 'GB-CAY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Cardiff',
        code: 'GB-CRF',
        subdivision: 'unitary authority',
      },
      {
        name: 'Carmarthenshire',
        code: 'GB-CMN',
        subdivision: 'unitary authority',
      },
      {
        name: 'Central Bedfordshire',
        code: 'GB-CBF',
        subdivision: 'unitary authority',
      },
      {
        name: 'Ceredigion',
        code: 'GB-CGN',
        subdivision: 'unitary authority',
      },
      {
        name: 'Cheshire East',
        code: 'GB-CHE',
        subdivision: 'unitary authority',
      },
      {
        name: 'Cheshire West and Chester',
        code: 'GB-CHW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Conwy',
        code: 'GB-CWY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Cornwall',
        code: 'GB-CON',
        subdivision: 'unitary authority',
      },
      {
        name: 'Darlington',
        code: 'GB-DAL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Denbighshire',
        code: 'GB-DEN',
        subdivision: 'unitary authority',
      },
      {
        name: 'Derby',
        code: 'GB-DER',
        subdivision: 'unitary authority',
      },
      {
        name: 'Durham, County',
        code: 'GB-DUR',
        subdivision: 'unitary authority',
      },
      {
        name: 'East Riding of Yorkshire',
        code: 'GB-ERY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Flintshire',
        code: 'GB-FLN',
        subdivision: 'unitary authority',
      },
      {
        name: 'Gwynedd',
        code: 'GB-GWN',
        subdivision: 'unitary authority',
      },
      {
        name: 'Halton',
        code: 'GB-HAL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Hartlepool',
        code: 'GB-HPL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Herefordshire',
        code: 'GB-HEF',
        subdivision: 'unitary authority',
      },
      {
        name: 'Isle of Anglesey',
        code: 'GB-AGY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Isle of Wight',
        code: 'GB-IOW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Isles of Scilly',
        code: 'GB-IOS',
        subdivision: 'unitary authority',
      },
      {
        name: 'Kingston upon Hull',
        code: 'GB-KHL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Leicester',
        code: 'GB-LCE',
        subdivision: 'unitary authority',
      },
      {
        name: 'Luton',
        code: 'GB-LUT',
        subdivision: 'unitary authority',
      },
      {
        name: 'Medway',
        code: 'GB-MDW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Merthyr Tydfil',
        code: 'GB-MTY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Middlesbrough',
        code: 'GB-MDB',
        subdivision: 'unitary authority',
      },
      {
        name: 'Milton Keynes',
        code: 'GB-MIK',
        subdivision: 'unitary authority',
      },
      {
        name: 'Monmouthshire',
        code: 'GB-MON',
        subdivision: 'unitary authority',
      },
      {
        name: 'Neath Port Talbot',
        code: 'GB-NTL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Newport',
        code: 'GB-NWP',
        subdivision: 'unitary authority',
      },
      {
        name: 'North East Lincolnshire',
        code: 'GB-NEL',
        subdivision: 'unitary authority',
      },
      {
        name: 'North Lincolnshire',
        code: 'GB-NLN',
        subdivision: 'unitary authority',
      },
      {
        name: 'North Somerset',
        code: 'GB-NSM',
        subdivision: 'unitary authority',
      },
      {
        name: 'Northumberland',
        code: 'GB-NBL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Nottingham',
        code: 'GB-NGM',
        subdivision: 'unitary authority',
      },
      {
        name: 'Pembrokeshire',
        code: 'GB-PEM',
        subdivision: 'unitary authority',
      },
      {
        name: 'Peterborough',
        code: 'GB-PTE',
        subdivision: 'unitary authority',
      },
      {
        name: 'Plymouth',
        code: 'GB-PLY',
        subdivision: 'unitary authority',
      },
      {
        name: 'Poole',
        code: 'GB-POL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Portsmouth',
        code: 'GB-POR',
        subdivision: 'unitary authority',
      },
      {
        name: 'Powys',
        code: 'GB-POW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Reading',
        code: 'GB-RDG',
        subdivision: 'unitary authority',
      },
      {
        name: 'Redcar and Cleveland',
        code: 'GB-RCC',
        subdivision: 'unitary authority',
      },
      {
        name: 'Rhondda, Cynon, Taff',
        code: 'GB-RCT',
        subdivision: 'unitary authority',
      },
      {
        name: 'Rutland',
        code: 'GB-RUT',
        subdivision: 'unitary authority',
      },
      {
        name: 'Shropshire',
        code: 'GB-SHR',
        subdivision: 'unitary authority',
      },
      {
        name: 'Slough',
        code: 'GB-SLG',
        subdivision: 'unitary authority',
      },
      {
        name: 'South Gloucestershire',
        code: 'GB-SGC',
        subdivision: 'unitary authority',
      },
      {
        name: 'Southampton',
        code: 'GB-STH',
        subdivision: 'unitary authority',
      },
      {
        name: 'Southend-on-Sea',
        code: 'GB-SOS',
        subdivision: 'unitary authority',
      },
      {
        name: 'Stockton-on-Tees',
        code: 'GB-STT',
        subdivision: 'unitary authority',
      },
      {
        name: 'Stoke-on-Trent',
        code: 'GB-STE',
        subdivision: 'unitary authority',
      },
      {
        name: 'Swansea',
        code: 'GB-SWA',
        subdivision: 'unitary authority',
      },
      {
        name: 'Swindon',
        code: 'GB-SWD',
        subdivision: 'unitary authority',
      },
      {
        name: 'Telford and Wrekin',
        code: 'GB-TFW',
        subdivision: 'unitary authority',
      },
      {
        name: 'Thurrock',
        code: 'GB-THR',
        subdivision: 'unitary authority',
      },
      {
        name: 'Torbay',
        code: 'GB-TOB',
        subdivision: 'unitary authority',
      },
      {
        name: 'Torfaen',
        code: 'GB-TOF',
        subdivision: 'unitary authority',
      },
      {
        name: 'Vale of Glamorgan, The',
        code: 'GB-VGL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Warrington',
        code: 'GB-WRT',
        subdivision: 'unitary authority',
      },
      {
        name: 'West Berkshire',
        code: 'GB-WBK',
        subdivision: 'unitary authority',
      },
      {
        name: 'Wiltshire',
        code: 'GB-WIL',
        subdivision: 'unitary authority',
      },
      {
        name: 'Windsor and Maidenhead',
        code: 'GB-WNM',
        subdivision: 'unitary authority',
      },
      {
        name: 'Wokingham',
        code: 'GB-WOK',
        subdivision: 'unitary authority',
      },
      {
        name: 'Wrexham',
        code: 'GB-WRX',
        subdivision: 'unitary authority',
      },
      {
        name: 'York',
        code: 'GB-YOR',
        subdivision: 'unitary authority',
      },
    ],
  },
  {
    name: 'United States',
    code: 'US',
    provinces: [
      {
        name: 'District of Columbia',
        code: 'US-DC',
        subdivision: 'district',
      },
      {
        name: 'American Samoa',
        code: 'US-AS',
        subdivision: 'outlying territory',
      },
      {
        name: 'Guam',
        code: 'US-GU',
        subdivision: 'outlying territory',
      },
      {
        name: 'Northern Mariana Islands',
        code: 'US-MP',
        subdivision: 'outlying territory',
      },
      {
        name: 'Puerto Rico',
        code: 'US-PR',
        subdivision: 'outlying territory',
      },
      {
        name: 'United States Minor Outlying Islands',
        code: 'US-UM',
        subdivision: 'outlying territory',
      },
      {
        name: 'Virgin Islands, U.S.',
        code: 'US-VI',
        subdivision: 'outlying territory',
      },
      {
        name: 'Alabama',
        code: 'US-AL',
        subdivision: 'state',
      },
      {
        name: 'Alaska',
        code: 'US-AK',
        subdivision: 'state',
      },
      {
        name: 'Arizona',
        code: 'US-AZ',
        subdivision: 'state',
      },
      {
        name: 'Arkansas',
        code: 'US-AR',
        subdivision: 'state',
      },
      {
        name: 'California',
        code: 'US-CA',
        subdivision: 'state',
      },
      {
        name: 'Colorado',
        code: 'US-CO',
        subdivision: 'state',
      },
      {
        name: 'Connecticut',
        code: 'US-CT',
        subdivision: 'state',
      },
      {
        name: 'Delaware',
        code: 'US-DE',
        subdivision: 'state',
      },
      {
        name: 'Florida',
        code: 'US-FL',
        subdivision: 'state',
      },
      {
        name: 'Georgia',
        code: 'US-GA',
        subdivision: 'state',
      },
      {
        name: 'Hawaii',
        code: 'US-HI',
        subdivision: 'state',
      },
      {
        name: 'Idaho',
        code: 'US-ID',
        subdivision: 'state',
      },
      {
        name: 'Illinois',
        code: 'US-IL',
        subdivision: 'state',
      },
      {
        name: 'Indiana',
        code: 'US-IN',
        subdivision: 'state',
      },
      {
        name: 'Iowa',
        code: 'US-IA',
        subdivision: 'state',
      },
      {
        name: 'Kansas',
        code: 'US-KS',
        subdivision: 'state',
      },
      {
        name: 'Kentucky',
        code: 'US-KY',
        subdivision: 'state',
      },
      {
        name: 'Louisiana',
        code: 'US-LA',
        subdivision: 'state',
      },
      {
        name: 'Maine',
        code: 'US-ME',
        subdivision: 'state',
      },
      {
        name: 'Maryland',
        code: 'US-MD',
        subdivision: 'state',
      },
      {
        name: 'Massachusetts',
        code: 'US-MA',
        subdivision: 'state',
      },
      {
        name: 'Michigan',
        code: 'US-MI',
        subdivision: 'state',
      },
      {
        name: 'Minnesota',
        code: 'US-MN',
        subdivision: 'state',
      },
      {
        name: 'Mississippi',
        code: 'US-MS',
        subdivision: 'state',
      },
      {
        name: 'Missouri',
        code: 'US-MO',
        subdivision: 'state',
      },
      {
        name: 'Montana',
        code: 'US-MT',
        subdivision: 'state',
      },
      {
        name: 'Nebraska',
        code: 'US-NE',
        subdivision: 'state',
      },
      {
        name: 'Nevada',
        code: 'US-NV',
        subdivision: 'state',
      },
      {
        name: 'New Hampshire',
        code: 'US-NH',
        subdivision: 'state',
      },
      {
        name: 'New Jersey',
        code: 'US-NJ',
        subdivision: 'state',
      },
      {
        name: 'New Mexico',
        code: 'US-NM',
        subdivision: 'state',
      },
      {
        name: 'New York',
        code: 'US-NY',
        subdivision: 'state',
      },
      {
        name: 'North Carolina',
        code: 'US-NC',
        subdivision: 'state',
      },
      {
        name: 'North Dakota',
        code: 'US-ND',
        subdivision: 'state',
      },
      {
        name: 'Ohio',
        code: 'US-OH',
        subdivision: 'state',
      },
      {
        name: 'Oklahoma',
        code: 'US-OK',
        subdivision: 'state',
      },
      {
        name: 'Oregon',
        code: 'US-OR',
        subdivision: 'state',
      },
      {
        name: 'Pennsylvania',
        code: 'US-PA',
        subdivision: 'state',
      },
      {
        name: 'Rhode Island',
        code: 'US-RI',
        subdivision: 'state',
      },
      {
        name: 'South Carolina',
        code: 'US-SC',
        subdivision: 'state',
      },
      {
        name: 'South Dakota',
        code: 'US-SD',
        subdivision: 'state',
      },
      {
        name: 'Tennessee',
        code: 'US-TN',
        subdivision: 'state',
      },
      {
        name: 'Texas',
        code: 'US-TX',
        subdivision: 'state',
      },
      {
        name: 'Utah',
        code: 'US-UT',
        subdivision: 'state',
      },
      {
        name: 'Vermont',
        code: 'US-VT',
        subdivision: 'state',
      },
      {
        name: 'Virginia',
        code: 'US-VA',
        subdivision: 'state',
      },
      {
        name: 'Washington',
        code: 'US-WA',
        subdivision: 'state',
      },
      {
        name: 'West Virginia',
        code: 'US-WV',
        subdivision: 'state',
      },
      {
        name: 'Wisconsin',
        code: 'US-WI',
        subdivision: 'state',
      },
      {
        name: 'Wyoming',
        code: 'US-WY',
        subdivision: 'state',
      },
    ],
  },
  {
    name: 'United States Minor Outlying Islands',
    code: 'UM',
    provinces: [
      {
        name: 'Baker Island',
        code: 'UM-81',
      },
      {
        name: 'Howland Island',
        code: 'UM-84',
      },
      {
        name: 'Jarvis Island',
        code: 'UM-86',
      },
      {
        name: 'Johnston Atoll',
        code: 'UM-67',
      },
      {
        name: 'Kingman Reef',
        code: 'UM-89',
      },
      {
        name: 'Midway Islands',
        code: 'UM-71',
      },
      {
        name: 'Navassa Island',
        code: 'UM-76',
      },
      {
        name: 'Palmyra Atoll',
        code: 'UM-95',
      },
      {
        name: 'Wake Island',
        code: 'UM-79',
      },
    ],
  },
  {
    name: 'Uruguay',
    code: 'UY',
    provinces: [
      {
        name: 'Artigas',
        code: 'UY-AR',
      },
      {
        name: 'Canelones',
        code: 'UY-CA',
      },
      {
        name: 'Cerro Largo',
        code: 'UY-CL',
      },
      {
        name: 'Colonia',
        code: 'UY-CO',
      },
      {
        name: 'Durazno',
        code: 'UY-DU',
      },
      {
        name: 'Flores',
        code: 'UY-FS',
      },
      {
        name: 'Florida',
        code: 'UY-FD',
      },
      {
        name: 'Lavalleja',
        code: 'UY-LA',
      },
      {
        name: 'Maldonado',
        code: 'UY-MA',
      },
      {
        name: 'Montevideo',
        code: 'UY-MO',
      },
      {
        name: 'Paysandú',
        code: 'UY-PA',
      },
      {
        name: 'Rivera',
        code: 'UY-RV',
      },
      {
        name: 'Rocha',
        code: 'UY-RO',
      },
      {
        name: 'Río Negro',
        code: 'UY-RN',
      },
      {
        name: 'Salto',
        code: 'UY-SA',
      },
      {
        name: 'San José',
        code: 'UY-SJ',
      },
      {
        name: 'Soriano',
        code: 'UY-SO',
      },
      {
        name: 'Tacuarembó',
        code: 'UY-TA',
      },
      {
        name: 'Treinta y Tres',
        code: 'UY-TT',
      },
    ],
  },
  {
    name: 'Uzbekistan',
    code: 'UZ',
    provinces: [
      {
        name: 'Andijon',
        code: 'UZ-AN',
      },
      {
        name: 'Buxoro',
        code: 'UZ-BU',
      },
      {
        name: 'Farg‘ona',
        code: 'UZ-FA',
      },
      {
        name: 'Jizzax',
        code: 'UZ-JI',
      },
      {
        name: 'Namangan',
        code: 'UZ-NG',
      },
      {
        name: 'Navoiy',
        code: 'UZ-NW',
      },
      {
        name: 'Qashqadaryo',
        code: 'UZ-QA',
      },
      {
        name: 'Qoraqalpog‘iston Respublikasi',
        code: 'UZ-QR',
      },
      {
        name: 'Samarqand',
        code: 'UZ-SA',
      },
      {
        name: 'Sirdaryo',
        code: 'UZ-SI',
      },
      {
        name: 'Surxondaryo',
        code: 'UZ-SU',
      },
      {
        name: 'Toshkent',
        code: 'UZ-TO',
      },
      {
        name: 'Toshkent',
        code: 'UZ-TK',
      },
      {
        name: 'Xorazm',
        code: 'UZ-XO',
      },
    ],
  },
  {
    name: 'Vanuatu',
    code: 'VU',
    provinces: [
      {
        name: 'Malampa',
        code: 'VU-MAP',
      },
      {
        name: 'Pénama',
        code: 'VU-PAM',
      },
      {
        name: 'Sanma',
        code: 'VU-SAM',
      },
      {
        name: 'Shéfa',
        code: 'VU-SEE',
      },
      {
        name: 'Taféa',
        code: 'VU-TAE',
      },
      {
        name: 'Torba',
        code: 'VU-TOB',
      },
    ],
  },
  {
    name: 'Venezuela',
    code: 'VE',
    provinces: [
      {
        name: 'Amazonas',
        code: 'VE-Z',
      },
      {
        name: 'Anzoátegui',
        code: 'VE-B',
      },
      {
        name: 'Apure',
        code: 'VE-C',
      },
      {
        name: 'Aragua',
        code: 'VE-D',
      },
      {
        name: 'Barinas',
        code: 'VE-E',
      },
      {
        name: 'Bolívar',
        code: 'VE-F',
      },
      {
        name: 'Carabobo',
        code: 'VE-G',
      },
      {
        name: 'Cojedes',
        code: 'VE-H',
      },
      {
        name: 'Delta Amacuro',
        code: 'VE-Y',
      },
      {
        name: 'Dependencias Federales',
        code: 'VE-W',
      },
      {
        name: 'Distrito Capital',
        code: 'VE-A',
      },
      {
        name: 'Falcón',
        code: 'VE-I',
      },
      {
        name: 'Guárico',
        code: 'VE-J',
      },
      {
        name: 'Lara',
        code: 'VE-K',
      },
      {
        name: 'Miranda',
        code: 'VE-M',
      },
      {
        name: 'Monagas',
        code: 'VE-N',
      },
      {
        name: 'Mérida',
        code: 'VE-L',
      },
      {
        name: 'Nueva Esparta',
        code: 'VE-O',
      },
      {
        name: 'Portuguesa',
        code: 'VE-P',
      },
      {
        name: 'Sucre',
        code: 'VE-R',
      },
      {
        name: 'Trujillo',
        code: 'VE-T',
      },
      {
        name: 'Táchira',
        code: 'VE-S',
      },
      {
        name: 'Vargas',
        code: 'VE-X',
      },
      {
        name: 'Yaracuy',
        code: 'VE-U',
      },
      {
        name: 'Zulia',
        code: 'VE-V',
      },
    ],
  },
  {
    name: 'Viet Nam',
    code: 'VN',
    provinces: [
      {
        name: 'An Giang',
        code: 'VN-44',
      },
      {
        name: 'Bà Rịa–Vũng Tàu',
        code: 'VN-43',
      },
      {
        name: 'Bình Dương',
        code: 'VN-57',
      },
      {
        name: 'Bình Phước',
        code: 'VN-58',
      },
      {
        name: 'Bình Thuận',
        code: 'VN-40',
      },
      {
        name: 'Bình Định',
        code: 'VN-31',
      },
      {
        name: 'Bạc Liêu',
        code: 'VN-55',
      },
      {
        name: 'Bắc Giang',
        code: 'VN-54',
      },
      {
        name: 'Bắc Kạn',
        code: 'VN-53',
      },
      {
        name: 'Bắc Ninh',
        code: 'VN-56',
      },
      {
        name: 'Bến Tre',
        code: 'VN-50',
      },
      {
        name: 'Cao Bằng',
        code: 'VN-04',
      },
      {
        name: 'Cà Mau',
        code: 'VN-59',
      },
      {
        name: 'Cần Thơ',
        code: 'VN-CT',
      },
      {
        name: 'Gia Lai',
        code: 'VN-30',
      },
      {
        name: 'Hà Giang',
        code: 'VN-03',
      },
      {
        name: 'Hà Nam',
        code: 'VN-63',
      },
      {
        name: 'Hà Nội',
        code: 'VN-HN',
      },
      {
        name: 'Hà Tây',
        code: 'VN-15',
      },
      {
        name: 'Hà Tĩnh',
        code: 'VN-23',
      },
      {
        name: 'Hòa Bình',
        code: 'VN-14',
      },
      {
        name: 'Hưng Yên',
        code: 'VN-66',
      },
      {
        name: 'Hải Dương',
        code: 'VN-61',
      },
      {
        name: 'Hải Phòng',
        code: 'VN-HP',
      },
      {
        name: 'Hậu Giang',
        code: 'VN-73',
      },
      {
        name: 'Hồ Chí Minh',
        code: 'VN-SG',
      },
      {
        name: 'Khánh Hòa',
        code: 'VN-34',
      },
      {
        name: 'Kiên Giang',
        code: 'VN-47',
      },
      {
        name: 'Kon Tum',
        code: 'VN-28',
      },
      {
        name: 'Lai Châu',
        code: 'VN-01',
      },
      {
        name: 'Long An',
        code: 'VN-41',
      },
      {
        name: 'Lào Cai',
        code: 'VN-02',
      },
      {
        name: 'Lâm Đồng',
        code: 'VN-35',
      },
      {
        name: 'Lạng Sơn',
        code: 'VN-09',
      },
      {
        name: 'Nam Định',
        code: 'VN-67',
      },
      {
        name: 'Nghệ An',
        code: 'VN-22',
      },
      {
        name: 'Ninh Bình',
        code: 'VN-18',
      },
      {
        name: 'Ninh Thuận',
        code: 'VN-36',
      },
      {
        name: 'Phú Thọ',
        code: 'VN-68',
      },
      {
        name: 'Phú Yên',
        code: 'VN-32',
      },
      {
        name: 'Quảng Bình',
        code: 'VN-24',
      },
      {
        name: 'Quảng Nam',
        code: 'VN-27',
      },
      {
        name: 'Quảng Ngãi',
        code: 'VN-29',
      },
      {
        name: 'Quảng Ninh',
        code: 'VN-13',
      },
      {
        name: 'Quảng Trị',
        code: 'VN-25',
      },
      {
        name: 'Sóc Trăng',
        code: 'VN-52',
      },
      {
        name: 'Sơn La',
        code: 'VN-05',
      },
      {
        name: 'Thanh Hóa',
        code: 'VN-21',
      },
      {
        name: 'Thái Bình',
        code: 'VN-20',
      },
      {
        name: 'Thái Nguyên',
        code: 'VN-69',
      },
      {
        name: 'Thừa Thiên–Huế',
        code: 'VN-26',
      },
      {
        name: 'Tiền Giang',
        code: 'VN-46',
      },
      {
        name: 'Trà Vinh',
        code: 'VN-51',
      },
      {
        name: 'Tuyên Quang',
        code: 'VN-07',
      },
      {
        name: 'Tây Ninh',
        code: 'VN-37',
      },
      {
        name: 'Vĩnh Long',
        code: 'VN-49',
      },
      {
        name: 'Vĩnh Phúc',
        code: 'VN-70',
      },
      {
        name: 'Yên Bái',
        code: 'VN-06',
      },
      {
        name: 'Điện Biên',
        code: 'VN-71',
      },
      {
        name: 'Đà Nẵng',
        code: 'VN-DN',
      },
      {
        name: 'Đắk Lắk',
        code: 'VN-33',
      },
      {
        name: 'Đắk Nông',
        code: 'VN-72',
      },
      {
        name: 'Đồng Nai',
        code: 'VN-39',
      },
      {
        name: 'Đồng Tháp',
        code: 'VN-45',
      },
    ],
  },
  //   { name: 'Virgin Islands, British', code: 'VG' },
  //   { name: 'Virgin Islands, U.S.', code: 'VI' },
  //   { name: 'Wallis and Futuna', code: 'WF' },
  //   { name: 'Western Sahara', code: 'EH' },
  {
    name: 'Yemen',
    code: 'YE',
    provinces: [
      {
        name: "'Adan",
        code: 'YE-AD',
      },
      {
        name: "'Amrān",
        code: 'YE-AM',
      },
      {
        name: 'Abyān',
        code: 'YE-AB',
      },
      {
        name: "Al Bayḑā'",
        code: 'YE-BA',
      },
      {
        name: 'Al Jawf',
        code: 'YE-JA',
      },
      {
        name: 'Al Mahrah',
        code: 'YE-MR',
      },
      {
        name: 'Al Maḩwīt',
        code: 'YE-MW',
      },
      {
        name: 'Al Ḩudaydah',
        code: 'YE-HU',
      },
      {
        name: "Aḑ Ḑāli'",
        code: 'YE-DA',
      },
      {
        name: 'Dhamār',
        code: 'YE-DH',
      },
      {
        name: 'Ibb',
        code: 'YE-IB',
      },
      {
        name: 'Laḩij',
        code: 'YE-LA',
      },
      {
        name: "Ma'rib",
        code: 'YE-MA',
      },
      {
        name: 'Raymah',
        code: 'YE-RA',
      },
      {
        name: 'Shabwah',
        code: 'YE-SH',
      },
      {
        name: 'Tā‘izz',
        code: 'YE-TA',
      },
      {
        name: "Şan‘ā'",
        code: 'YE-SA',
      },
      {
        name: "Şan‘ā'",
        code: 'YE-SN',
      },
      {
        name: 'Şā‘dah',
        code: 'YE-SD',
      },
      {
        name: 'Ḩajjah',
        code: 'YE-HJ',
      },
      {
        name: 'Ḩaḑramawt',
        code: 'YE-HD',
      },
    ],
  },
  {
    name: 'Zambia',
    code: 'ZM',
    provinces: [
      {
        name: 'Central',
        code: 'ZM-02',
      },
      {
        name: 'Copperbelt',
        code: 'ZM-08',
      },
      {
        name: 'Eastern',
        code: 'ZM-03',
      },
      {
        name: 'Luapula',
        code: 'ZM-04',
      },
      {
        name: 'Lusaka',
        code: 'ZM-09',
      },
      {
        name: 'North-Western',
        code: 'ZM-06',
      },
      {
        name: 'Northern',
        code: 'ZM-05',
      },
      {
        name: 'Southern',
        code: 'ZM-07',
      },
      {
        name: 'Western',
        code: 'ZM-01',
      },
    ],
  },
  {
    name: 'Zimbabwe',
    code: 'ZW',
    provinces: [
      {
        name: 'Bulawayo',
        code: 'ZW-BU',
      },
      {
        name: 'Harare',
        code: 'ZW-HA',
      },
      {
        name: 'Manicaland',
        code: 'ZW-MA',
      },
      {
        name: 'Mashonaland Central',
        code: 'ZW-MC',
      },
      {
        name: 'Mashonaland East',
        code: 'ZW-ME',
      },
      {
        name: 'Mashonaland West',
        code: 'ZW-MW',
      },
      {
        name: 'Masvingo',
        code: 'ZW-MV',
      },
      {
        name: 'Matabeleland North',
        code: 'ZW-MN',
      },
      {
        name: 'Matabeleland South',
        code: 'ZW-MS',
      },
      {
        name: 'Midlands',
        code: 'ZW-MI',
      },
    ],
  },
];
