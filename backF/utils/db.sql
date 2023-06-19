CREATE TABLE wilaya (
code varchar(2) NOT NULL,
namefr varchar(200) NOT NULL,
namear varchar(200) NULL,
CONSTRAINT wilaya_pk PRIMARY KEY (code)
);

CREATE TABLE commune (
id int4 NOT NULL,
namear varchar(255) NOT NULL,
namefr varchar(255) NOT NULL,
wilayacode varchar(4) NOT NULL,
CONSTRAINT commune_pkey PRIMARY KEY (id)
);

CREATE TABLE signalementmotif (
code int4 NOT NULL,
designationfr varchar(250) NULL,
designationar varchar(250) NULL,
description text NULL,
CONSTRAINT signalementmotif_pkey PRIMARY KEY (code)
);

CREATE TABLE citoyen (
id serial NOT NULL PRIMARY KEY,
nom varchar(200) NULL,
prenom varchar(200) NULL,
age int4 NULL, 
adresse varchar(250) NULL,
tel varchar(50) NULL,
sexe varchar(20) NULL,
inscriptiondate date
);

CREATE TABLE typesignaleur(
id int4 NOT NULL,
descriptif varchar(200) NULL,
CONSTRAINT typesignaleur_pkey PRIMARY KEY (id)
);

CREATE TABLE signalement (
id serial4 NOT NULL PRIMARY KEY,
motifid int4 NULL,
citoyenid int4,
enfantid int4,
"date" date NULL,
heure time NULL,
lienparente varchar(50) NULL,
localisationcitoyen varchar(50) NULL,
localisationsignalement varchar(50) NULL,
adresse varchar(250) NULL,
communeid int4 NULL,
identitesecrete bool NULL,
descriptif text,
statut varchar(20) NULL,
notes text NULL , 
preuveid int4 NULL,
typesignaleurid int4 NULL,
dateincident date Null
);

 CREATE TABLE enfant (
id serial4 NOT NULL PRIMARY KEY,
nom varchar(200) NULL,
prenom varchar(200) NULL,
nom_ar varchar(200) NULL,
prenom_ar varchar(200) NULL,
adresse varchar(250) NULL,
age int2,
daten date NULL,
lieun varchar(250) NULL,
sexe varchar(20) NULL,
situationparent varchar(250) NULL,
perenom varchar(200) NULL,
pereprenom varchar(200) NULL,
perefonction varchar(200) NULL,
merenom varchar(200) NULL,
mereprenom varchar(200) NULL,
merefonction varchar(200) NULL,
notes text NULL,
wilayacode varchar(4) NULL
);

CREATE TABLE piecejointeimg (
  id serial NOT NULL PRIMARY KEY,
  path VARCHAR(255) ,
  type VARCHAR(50) ,
  description text NULL,
  size int4 ,
  signalementid int4 NULL
);

CREATE TABLE piecejointevideo (
  id SERIAL NOT NULL PRIMARY KEY,
  path VARCHAR(255) ,
  type VARCHAR(255) ,
  description text NULL,
  size INTEGER,
  signalementid int4 NULL
);

CREATE TABLE piecejointevocale (
  id SERIAL NOT NULL PRIMARY KEY,
  path VARCHAR(255) ,
  type VARCHAR(255) ,
  description text NULL,
  size INTEGER,
  signalementid int4 NULL
);

INSERT INTO typesignaleur(id, descriptif) 
VALUES (1, 'enfant'), (2, 'représentant légitime'), (3, 'personne physique') , (4, 'personne morale');

INSERT INTO wilaya (code, namefr, namear)
VALUES 
(1, 'Adrar', 'أدرار'),
(2, 'Chlef', 'الشلف'),
(3, 'Laghouat', 'الأغواط'),
(4, 'Oum El Bouaghi', 'أم البواقي'),
(5, 'Batna', 'باتنة'),
(6, 'Béjaïa', 'بجاية'),
(7, 'Biskra', 'بسكرة'),
(8, 'Béchar', 'بشار'),
(9, 'Blida', 'البليدة'),
(10, 'Bouira', 'البويرة'),
(11, 'Tamanrasset', 'تمنراست'),
(12, 'Tébessa', 'تبسة'),
(13, 'Tlemcen', 'تلمسان'),
(14, 'Tiaret', 'تيارت'),
(15, 'Tizi Ouzou', 'تيزي وزو'),
(16, 'Alger', 'الجزائر'),
(17, 'Djelfa', 'الجلفة'),
(18, 'Jijel', 'جيجل'),
(19, 'Sétif', 'سطيف'),
(20, 'Saïda', 'سعيدة'),
(21, 'Skikda', 'سكيكدة'),
(22, 'Sidi Bel Abbès', 'سيدي بلعباس'),
(23, 'Annaba', 'عنابة'),
(24, 'Guelma', 'قالمة'),
(25, 'Constantine', 'قسنطينة'),
(26, 'Médéa', 'المدية'),
(27, 'Mostaganem', 'مستغانم'),
(28, 'MSila', 'المسيلة'),
(29, 'Mascara', 'معسكر'),
(30, 'Ouargla', 'ورقلة'),
(31, 'Oran', 'وهران'),
(32, 'El Bayadh', 'البيض'),
(33, 'Illizi', 'إليزي'),
(34, 'Bordj Bou Arreridj', 'برج بوعريريج'),
(35, 'Boumerdès', 'بومرداس'),
(36, 'El Tarf', 'الطارف'),
(37, 'Tindouf', 'تندوف'),
(38, 'Tissemsilt', 'تيسمسيلت'),
(39, 'El Oued', 'الوادي'),
(40, 'Khenchela', 'خنشلة'),
(41, 'Souk Ahras', 'سوق أهراس'),
(42, 'Tipaza', 'تيبازة'),
(43, 'Mila', 'ميلة'),
(44, 'Aïn Defla', 'عين الدفلى'),
(45, 'Naâma', 'النعامة'),
(46, 'Aïn Témouchent', 'عين تموشنت'),
(47, 'Ghardaïa', 'غرداية'),
(48, 'Relizane', 'غليزان');


INSERT INTO signalementmotif (code, designationar, designationfr) 
VALUES 
('1', '.فقدان الطفل لوالديه وبقائه دون سند عائلي', 'Perte des parents et absence de soutien familial'),
('2', '.تعريض الطفل للإهمال أو التشرد', 'Négligence ou vagabondage de l enfant'),
('3', 'المساس بحقه في التعليم', 'Atteinte à son droit à léducation'),
('4', 'التسول بالطفل أو تعريضه للتسول', 'Sollicitation ou exploitation à la mendicité'),
('5', 'عجز من يقوم برعاية الطفل عن التحكم في تصرفاته', 'Incapacité de la personne en charge de contrôler ses comportements'),
('6', 'التقصير البين والمتواصل في التربية والرعاية', 'Défaut persistant de soin ou d éducation'),
('7', 'سوء معاملة الطفل', 'Mauvais traitement de l enfant'),
('8', 'الطفل ضحية جريمة من ممثله الشرعي', 'L enfant victime d un crime de la part d un représentant légal'),
('9', 'الطفل ضحية جريمة من أي شخص آخر', 'L enfant victime d un crime de la part de n importe qui d autre'),
('10', 'الاستغلال الجنسي للطفل بمختلف أشكاله', 'Exploitation sexuelle de l enfant sous toutes ses formes'),
('11', 'الاستغلال الاقتصادي للطفل', 'Exploitation économique de l enfant'),
('12', 'وقوع الطفل ضحية نزاعات مسلحة', 'L enfant victime de conflits armés'),
('13', 'الطفل اللاجئ', 'Enfant réfugié');

