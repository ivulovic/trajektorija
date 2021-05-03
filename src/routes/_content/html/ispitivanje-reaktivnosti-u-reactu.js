export default `
<p>
  Још одавно се појавила потреба да се велике количине података обрађују на што ефективнији начин. 
  Можда најбољи пример су управо Ексел табеле где имамо на хиљаде записа који су међусобно повезани, 
  а када дође до промене мењају се само поља која су међусобно зависна, без беспотребног проверавања свих осталих.
  Управо о овоме се ради и у реактивном програмирању.
</p>

<p>
  Хајде да погледамо ово парче кода:
</p>

<code>
<pre>
var a = 1;
var b = 2;
var c = a + b;
a = 10;
console.log(c); // 3
</pre>
</code>

<p>
  Зашто није исписало <b>12</b>? Зато што <b>=</b> није оператор реактивног додељивања.
</p>

<p>
  Дакле треба нам неки нови оператор који ће да изврши такав начин доделе вредности. 
  У Јаваскрипту такав оператор не постоји и ово што ћемо сада видети би довело до синтаксне грешке.
</p>

<p>
  Замислимо да постоји оператор <b>$=</b> - оператор реактивног додељивања.
</p>

<code>
<pre>
var a = 1;
var b = 2;
var c $= a + b;
a = 10;
console.log(c); // 12
</pre>
</code>

<p>
  Суштина реактивног програмирања је у протоку података и праћењу вредности које пролазе кроз апликацију. Када се промени податак апликација би требало да одреагује.
</p>

<p>
  И ту долазимо до Риекта, он је стварно направио велике промене у свету веб програмирања. Користили га људи или не, он је веома утицао на много других језика шаблонима које користи.
  Још од 2013, откако је изашао, критиковао је многе постојеће библиотеке које су тада биле веома популарне и указивао на проблеме који постоје, а којих је ретко ко био свестан. 
  Баш та критика је довела до многих расправа, а потом промена и модернизације Јаваскипта као језика.
</p>

<p>
  Вратимо се на тему да видимо како Риект ради.
</p>

<code>
<pre>
function App(){
  const [count, setCount] = useState();
  const [name, setName] = useState("world");

  const handleClick = () => {
    setCount(count+1);
  }

  const handleInput = (e) => {
    setName(e.target.value);
  }
  
  return (
    &lt;div className="app"&gt;
      &lt;h1&gt;Hello {name}&lt;/h1&gt;
      &lt;input value={name} onInput={handleInput} /&gt;

      &lt;button onClick={handleClick}&gt;
        Clicks: {count}
      &lt;/button&gt;
    &lt;/div&gt;
  )
}
</pre>
</code>

<p>
  Ово је једноставна апликација која се састоји од једне компоненте. 
  Компонента има своје локално стање које се састоји од поља <b>count</b> и <b>name</b>. 
  Такође има и две функције које мењају вредности ова два поља, односно мењају локално стање компоненте.
  На крају враћамо парче виртуелног ДОМ-а.
</p>

<p> 
  Сваки пут када се стање у компоненти промени, виртуелни ДОМ се поново генерише, а Риектов посао је да усклади оно што је било раније са оним што је дошло касније. 
  Тај процес је познат и као <b>reconciliation</b>.
</p>

<p>
  Дакле хајде да видимо како овај процес усклађивања изгледа у случају када корисник кликне на дугме и повећа вредност поља <b>count</b>:
</p>

<code>
<pre>
element: div
  className: app
  children:
    element: h1
      children:
        text: Hello world
    element: input
      value: world
    element: button
      text: Clicks: 1
</pre>
</code>

<p>
  Крећемо са врха:
</p>
<ul>
  <li>Елемент <b>div</b> је остао непромењен - задржавамо га</li>
  <li>Елемент <b>div</b> садржи атрибут <b>className</b> који је остао непромењен - задржавамо га</li>
  <li>Прво дете елемента  <b>div</b> је елемент <b>h1</b> који је остао непромењен - задржавамо га</li>
  <li>Елемент <b>h1</b> у себи има текст који се није мењао - задржавамо га</li>
  <li>Друго дете  елемента  <b>div</b>  је <b>input</b> и он је остао непромењен - задржавамо га </li>
  <li>Елемент <b>input</b>  има вредност која се није мењала  - задржавамо га</li>
  <li>Наилазимо на треће дете  елемента  <b>div</b>, на елемент <b>button</b>, који је остао непромењен  - задржавамо га</li>
  <li>Елементу <b>button</b> се променио текст са 0 на 1 - извршавамо промену на ДОМ-у</li>
</ul>

<p>
  Толико посла да би се текст на дугмету са 0 променио на 1.
</p>

<p>
  Још горе од овога је сама помисао да се све ове функције поново праве испочетка сваки пут када се промени стање у компоненти. 
  Ово је само мали пример, али ако замислимо како би се то одразило на велике пројекте где има много више угњеждених компоненти, то би представљало много већи проблем.
  Из личног искуства сам се уверио да људи јако ретко користе ове помоћне методе, 
  па тако можемо да наиђемо на чест случај где радимо филтрирање великих низова изнова и изнова не помишљајући на <b>useMemo</b> или неки други начин.
  Ако идемо овим путем проблем ће се појавити врло брзо, тако да кроз само неколико месеци аљкавог писања кода можемо да дођемо до тога да апликација постане значајно спорија.
</p>

<p>
  У циљу да спречимо непотребно поновно исцртавање и проверавање, главни тим нам је пружио неколико функција:
</p>
<ul>
  <li>shouldComponentUpdate</li>
  <li>React.PureComponent</li>
  <li>useMemo</li>
  <li>useCallback</li>
</ul>

<p>
  Ово нам говори да су и они сами свесни да је потребно да се ради на додатним оптимизацијама, да је читав процес поновног исцртавања компоненти веома скуп и да овде уопште нема реактивности. 
</p>
<p>
  А да ли је довољно брз да задовољи захтеве већине? 
  То сигурно да.
</p>
`;