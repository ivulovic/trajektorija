export default `
<p>
  Постоји вероватно много начина како се креира библиотека састављена од прилагођених елемената. Ја сам за данашњу тему одабрао онај који је мени деловао најједноставније.
</p> 

<p>
  Као што сам поменуо у једном од својих претходних чланака, повремено се појави потреба да користећи своје ресурсе и постојећу инфраструктуру направимо библиотеку 
  састављену од одређених компоненти и потом доставимо другима на коришћење.
  Не знам да ли је само мени на први поглед деловало компликовано, али суштина је да се помоћу конфигурације направи сноп Јаваскрипт кода који после други могу да увозе.
</p> 

<p>
  Као последица учења нових ствари моје мишљење о алатима које сам користио се драстично мењало.
  Једног дана сам наишао на блог, стар око десетак година, који је за мало старије записе лепо напоменуо:
  „Овај чланак је стар више од две године. Сасвим је могуће да се моје мишљење на ову тему данас уопште не слаже са овде написаним.”.
  Веома ми се свидело то што сам видео, тако да имаш право да погађаш само једном шта ћу данас да правим.
  </p> 

<p>
  Компонента која треба да буде обележена као прилагођена се од обичне разликује само по томе што 
  садржи специјални обележивач који нам пружа Свелт: <span class="code">&lt;svelte:options /&gt;</span>. 
  Овај обележивач као параметар прима и назив по ком ћемо га, када увеземо библиотеку, позивати у нашој апликацији.
</p> 

<code>
<pre>
&lt;script&gt;
  ... 
  export let date;
  const currentYear = new Date().getFullYear();
  const dateYear = new Date(+date).getFullYear();
  const shouldShow = currentYear - dateYear &gt;= 2;
&lt;/script&gt;

&lt;style&gt;  
  ...
&lt;/style&gt;

{#if shouldShow}
  &lt;div&gt;
    &lt;span&gt;
      &lt;WarningIcon /&gt;
    &lt;/span&gt;
    &lt;p&gt;
      Овај чланак је стар више од две године. Сасвим је могуће да се моје
      мишљење на ову тему данас уопште не слаже са овде написаним.
    &lt;/p&gt;
  &lt;/div&gt;
{/if}

&lt;svelte:options tag="deprecated-warning" /&gt;
</pre>
</code>

<p>
  Оно што нас занима овде је датум који нам стиже споља. Једноставно поредимо тренутни
  и прослеђени датум и ако испуњава наш интерни услов онда приказујемо обавештење. 
  На крају кроз <span class="code">svelte:options</span> кажемо како хоћемо да се наша компонента зове, односно обележивач
  који ћемо да користимо да бисмо је приказали. 

  Наравно ову компоненту сам могао да направим да буде још више конфигурабилна, тако да особа која је користи може да бира оно што ће
  исписивати или да може да накачи неколико функција које ће, слушајући на одређене догађаје, да манипулишу компонентом. 
  Идеја овог чланка је више да покажем процес имплементације компоненте и начин на који можемо да направимо сноп.
</p> 

<p>
 За потребе прављења снопа требаће ми алат којим могу да направим минификовани фајл користећи одређену конфигурацију. 
 У овом случају користићу <a href="https://rollupjs.org/guide/en/" target="_blank">Ролап</a>.
</p> 

<code>
<pre>
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
const terser = require('rollup-plugin-terser').terser;
import pkg from './package.json';

const name = pkg.name;

export default {
	input: 'src/index.js',
	output: [{ file: pkg.main, 'format': 'umd', name, plugins: [ terser() ] }],
	plugins: [
		svelte({ customElement: true }),
		resolve(),
	]
}
</pre>
</code>

<p>
 Оно што ће ова конфигурација направити је минификовани Јаваскрипт фајл који у себи садржи компоненте које смо извезли кроз 
 фајл који смо дефинисали као улазни, кроз поље <span class="code">input</span>. 
 У овом фајлу су само пописане компоненте које хоћемо да извеземо, а које ће потом да буду укључене у нашу библиотеку.
</p> 

<p>
 Оно што је још важно је да, када хоћемо да извеземо прилагођене елементе, 
 морамо и да напоменемо у Ролап конфигурацији да ћемо имати бар један прилагођени елемент. Ово је немогуће пропустити,
 јер ће и компонента коју смо дефинисали да буде прилагођена такође обавестити развијаоца да обавезно каже Свелту да такве 
 компоненте постоје.
</p> 

<p>
 Када коначно направимо конфигурацију какву желимо и добијемо фајл који можемо да увеземо, компоненту у свом коду користимо 
 онако како смо дефинисали кроз <span class="code">svelte:options</span>. 
 
 У случају да нашу новокреирану компоненту хоћемо да убацимо у ХТМЛ фајл, позивање би било крајње једноставно, 
 као када бисмо позвали било који други обележивач, с тим што за прослеђивање вредности нису потребни никакви префикси, што додатно олакшава коришћење.
</p> 
`;