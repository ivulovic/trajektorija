export default `
<p>
До скоро сам био врло затворен по питању веб компоненти. 
То су компоненте које се прилагоде било ком пројекту саме од себе - то ми је тако банално и неуверљиво звучало кад год је неко покушао да их објасни, па им из тог разлога нисам ни веровао. 
С друге стране нисам ни имао потребу за њима.
Сматрао сам да би сваки пројекат најбоље и најбрже радио када бисмо користили компоненте из домена у ком пишемо саму апликацију, а додатно чачкање и писање на више места ми се никако није свиђало. 
Џандрљивост је трајала док се није појавила потреба да направим библиотеку која у себи садржи неколико компоненти, библиотеку коју нека трећа компанија треба да увезе и користи без имало мучења око поставке.
</p>

<p>
Зашто је моја теорија пала у воду?
</p>

<p>
У случају да користимо Риект, превише је да извозимо 130 килобајта (react + react-dom) у туђ пројекат ако постоји начин да направимо библиотеку тешку око 3 килобајта у Свелту. 
Зашто не бисмо користили сву благодат широког избора коју данас имамо и зашто ако већ можемо да бирамо не бисмо одабрали алат с којим ћемо много лакше направити производ?
</p>

<p>
Као што постоји мноштво туђих библиотека које користимо у свом пројекту, тако се некад и јави потреба да извеземо неколико наших које су специфичне и које су директно везане за нашу инфраструктуру. 
За те потребе у Свелту користимо <a href="https://svelte.dev/docs#Custom_element_API" target="new">прилагођене елементе</a>.
Они су обележени онако како смо ми развијаоци осмислили и могу се користити у било којој апликацији просто к'о <span class="code">&lt;пасуљ /&gt;</span>. 
</p>

<p>
Постоји неколико разлога зашто баш све библиотеке у потпуности не подржавају ове компоненте. Узећу за пример Риект. 
Његова подршка је негде око 70% процената, а објашњење за то лежи у начину како Риект прослеђује податке и начину како ослушкује на бачене догађаје.
</p>

<p>
Прилагођеним компонентама Риект прослеђује податке у виду ХТМЛ атрибута. Проследити стринг или неки други примитивни тип није тешко, али проблем се јавља када желимо да проследимо објекте или низове. 
У овом случају компонента ће добити нешто овако: <span class="code">moj-atribut="[object Object]"</span>. Овакав формат прослеђене вредности није употребљив. 
Овде би помогло стрингификовање објеката па затим парсирање назад, али то више личи на додатно компликовање него на решавање проблема.
</p>

<p>
Као што знамо Риект има своју имплементацију система догађаја - синтетички систем. Он не може да слуша на ДОМ догађаје бачене из прилагођених компоненти тек тако. Требало би да се накачи референца на компоненту
и да се ручно дода ослушкивач користећи <b>addEventListener</b>. Ни то није тешко одрадити, само је проблем у томе што оне нису намењене таквом начину коришћења.  
</p>

<p>
Због свих ових заобилазних решења, целокупан процес коришћења личи више на буџење него на оно што је била првобитна намена: лако и једноставна поставка у било коју апликацију.
Добра ствар је што се за Риект може некако наћи решење користећи Приект, његов учинак је стопроцентан. 
</p>

<p>
Овај тип компоненти јесте себи нашао место у савременом свету, али се не бих сложио са тим да ће се апликације у будућности правити да буду у што већем проценту састављене од њих.
Оно око чега се слажем је да ће јако смањити обим кода и време које утрошимо да напишемо компоненту. 
Биће јако корисно ако за нека три пројекта писана у Енгулару, Вјуу и Риекту једноставно можемо да користимо исте прилагођене елементе и уколико је потребно да споља мењамо понашање или изглед.
</p>
`