export default `
<p>
  Нисам сигуран ко је крив за погрешно поимање тога што је за Риект одабрано баш то име, да ли је то њихов главни тим, или само остатак света који само чека прилику да згази све што је до сада урађено. 
  Било како било, он је донео много иновација и нисам имао намеру да ово што сам скоро писао о њему погрешно звучи, односно да неко схвати да сам један од ових што једва чека да се подсмехне томе што није реактиван а зове се Риект. 
</p>

<p>
  С друге стране доста се развијао и Свелт. 
  Прве две верзије нису имале ништа ново што би ми привукло пажњу, а ни синтакса ми се није свиђала - доста је личило на Вју. 
</p>


<p>
  Кад сам већ поменуо Вју желим да кажем да ми се целокупна та идеја сецкања Енгулара, Риекта и прављење од њих џеј-ес кашу није свиђала па га нисам превише ни користио. 
  Оно што ме је нервирало јесте и недостатак идеја шта би то ново и иновативно могло да се убаци у следећу верзију, а да није већ виђено код других. 
  Ишло је исувише трапаво, као да ни сами нису знали на шта би требало да обрате пажњу и увек је испадало да водећи велики тимови, Риектов или Енгуларов, представе нешто ново, 
  а Вјуов тим направи копију тога отплике после годину дана.
</p>

<p>
  Дакле како је Свелт успео да буде постане реактиван?
</p>

<p>
  Идеју о томе како би требало да се код извршава су пронашли код алата који се зове <a href="https://observablehq.com/@observablehq/a-taste-of-observable?collection=@observablehq/overview" target="new">Обзервабл</a>. 
  Код њих се изврашавање кода не ради од врха ка дну, него тополошким редом, што значи да ако А зависи од Б онда ће се прво израчунати Б па тек онда А, независно од места где смо декларисали изразе.
  Ако ово није довољно јасно, бољи пример може да буде Ексел табела.
</p>

<code><pre>A1 = B1 + C1;</pre></code>

<p>
  Ако имамо формулу као што је ова горе, прово ће се рачунати вредности поља B1 и C1 па тек онда доделити пољу A1. У сваком следећем тренутку ако дође до промена вредности поља B1 или C1 
  промениће се и A1 без потребе да му се одради поновна додела. Ово је заправо прави пример реактивности и оно што ми хоћемо да имамо у Јаваскрипту.
</p>

<p>
  Али у Јаваскрипту не постоји оператор реактивне доделе вредности и то би проузроковало синтаксну грешку. Оно што је добро овде је да је Свелт компајлер, што значи да може да има свој начин како ће да преводи написани код.
  Оно што је фалило био је начин да некако кажемо да не желимо да користимо стандардан оператор доделе <b>=</b>, већ да то буде реактивни оператор доделе.
  Решење које је Свелт тим одабрао је било да се користи <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label" target="new">обележени исказ</a>. 
  Ова опција је нешто мање заступљена и ређе се користи, па је самим тим и мање позната. Уз помоћ овог једноставног идентификатора Свелт ће знати како да се носи са комадом кода који је пред њим.
</p>

<p>
  Дакле коначно смо нашли начин да напишемо нешто овако:
</p>

<code>
<pre>
let a = 10;
$: b = a + 1;
</pre>
</code>

<p>
  Хајде да видимо како ово ради на примеру једне једноставне компоненте.
</p>

<code>
<pre>
&lt;script&gt;
  let a = "A";
  $: c = b.length;
  $: b = a + "B";
  const clickHandler = () =&gt; a += "X";
&lt;/script&gt;

&lt;h1&gt;{b}!&lt;/h1&gt;

&lt;button on:click={clickHandler}&gt;
  Click
&lt;/button&gt;
</pre>
</code>

<p>
  У позадини постоји функција <b>update</b> која је део једне веће функције. 
  Та већа функција у себи садржи поља које смо дефинисали кроз компоненту, а то су:  <b>a</b>, <b>b</b>, <b>c</b> и коначно <b>clickHandler</b>. 
  Наша малочас поменута <b>update</b> функција једноставним <b>if</b> упитима интерно мења и инвалидира старе вредности.
</p>

<code>
<pre>
$$self.$$.update = (changed) =&gt; {
  if(changed.a){
    b = a + "B"; $$invalidate("b", b);
  }
  if(changed.b){
    c = b.length; $$invalidate("c", c);
  }
}
</pre>
</code>

<p>
  Овде видимо да програм који се извршава у позадини је довољно паметан да препозна да <b>c</b> зависи од вредности поља <b>b</b>. 
  Зна да прво треба да израчуна <b>b</b> да би касније могао да израчуна вредност поља <b>c</b>.
</p>

<p>
  То је тополошки редослед извршавања о ком смо причали малопре и као што видимо редослед писања исказа не утиче овај начин извршавања. 
</p>

`;