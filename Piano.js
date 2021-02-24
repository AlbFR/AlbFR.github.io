const WIDTH = 1050 ;
const HEIGHT = 400 ;
let tonic = 0 ;
let MX ;
let MY ;
let sel ;
let change = false ;
let tonos = [2,2,1,2,2,2,1] ;
let cont ;
let dark = true ;
let english = false ;
let sellang ;
function setup()
{
	createCanvas(WIDTH,HEIGHT+200) ;
	textAlign(CENTER) ;
	//selectLanguage() ;
	selectDark() ;
	selectMode() ;
}
function draw()
{
	background(0) ;
	printWhiteTiles() ;
	printWhiteScaleTiles() ;
	printBlackTiles() ;
	printBlackInScaleTiles() ;
	showScaleNotes() ;
	showScaleChords() ;
}
function selectLanguage()
{
	sellang = createSelect() ;
	sellang.position(55,HEIGHT+45) ;
	sellang.option("Español","A") ;
	let a = document.getElementById("")
	sellang.option("English") ;
	sellang.changed(()=>
	{
		if(sellang.value() == "English")
		{
			english = true ;
			location.reload() ;
		}
		else
		{
			english = false ;
			location.reload() ;
		}
	}) ;
}
function selectDark()
{
	dark = createSelect() ;
	dark.position(920,HEIGHT+50) ;
	if(english)
	{
		dark.option("Light") ;
		dark.option("Dark") ;
	}
	else
	{
		dark.option("Claro") ;
		dark.option("Oscuro") ;
	}
}
function showScaleChords()
{

}
function showScaleNotes()
{
	stroke(255,0,0) ;
	line(0,HEIGHT+200,WIDTH,HEIGHT+200) ;
	line(0,HEIGHT+100,WIDTH,HEIGHT+100) ;
	fill(255) ;
	rect(200,HEIGHT,700,200) ;
	stroke(0) ;
	line(200,HEIGHT+100,900,HEIGHT+100) ;
	for(let i = 1 ; i < 7 ; i++)
	{
		line(200+100*i,HEIGHT,200+100*i,HEIGHT+200) ;
	}

}
function selectMode()
{
	sel = createSelect() ;
	sel.position(55,HEIGHT+145) ;
	sel.option("Jónico","A") ;
	sel.option("Dórico") ;
	sel.option("Frigio") ;
	sel.option("Lidio") ;
	sel.option("Mixolidio") ;
	sel.option("Eólico") ;
	sel.option("Locrio") ;
	sel.changed(changeScale);
	
}
function printWhiteTiles()
{
	fill(255) ;
	for(let i = 0 ; i < 3 ; i++)
	{
		for(let j = 0 ; j < 12 ; j++)
		{
			if(!notes[j].Dom)
			{
				continue ;
			}
			whitetile(notes[j].x,i) ;
		}
	}
}
function changeScale()
{
	switch(sel.value())
	{
		case "Jónico":
			tonos = [2,2,1,2,2,2,1,0] ;
			break ;
		case "Dórico":
			tonos = [2,1,2,2,2,1,2,0] ;
			break ;
		case "Frigio":
			tonos = [1,2,2,2,1,2,2,0] ;
			break ;
		case "Lidio":
			tonos = [2,2,2,1,2,2,1,0] ;
			break ;
		case "Mixolidio":
			tonos = [2,2,1,2,2,1,2,0] ;
			break ;
		case "Eólico":
			tonos = [2,1,2,2,1,2,2,0] ;
			break ;
		case "Locrio":
			tonos = [1,2,2,1,2,2,2,0] ;
			break ;
	}
	for(let i = 0 ; i < 12 ; i++)
	{
		notes[i].cusc = false ;
	}
	cont = tonic ;
	for(let i = 0 ; i <= 7 ; i++)
	{
		cont = cont%12 ;
		notes[cont].cusc = true ;
		cont += tonos[i] ;			
	}
}
function printWhiteScaleTiles()
{
	fill(100,100,200) ;
	for(let i = 0 ; i < 3 ; i++)
	{
		for(let j = 0 ; j < 12 ; j++)
		{
			if(!notes[j].Dom)
			{
				continue ;
			}
			if(notes[j].cusc)
			{
				rect(notes[j].x+i*WIDTH/3,0,50,HEIGHT) ;
			}
			if(j == tonic)
			{
				printTonic(true,notes[j].x,i) ;
				fill(100,100,200) ;
			}
		}
	}
}
function printBlackTiles()
{
	fill(0) ;
	for(let i = 0 ; i < 3 ; i++)
	{
		for(let j = 0 ; j < 12 ; j++)
		{
			if(notes[j].Dom)
			{
				continue ;
			}
			blacktile(notes[j].x,i) ;
		}
	}
}
function printBlackInScaleTiles()
{
	fill(50,0,150) ;
	for(let i = 0 ; i < 3 ; i++)
	{
		for(let j = 0 ; j < 12 ; j++)
		{
			if(notes[j].Dom)
			{
				continue ;
			}
			if(notes[j].cusc)
			{
				blacktile(notes[j].x,i) ;
			}
			if(j == tonic)
			{
				printTonic(false,notes[j].x,i) ;
				fill(50,0,150) ;
			}
		}
	}
}
function printTonic(white,x,time)
{
	fill(150,0,0) ;
	if(white)
	{
		whitetile(x,time) ;
	}
	else
	{
		blacktile(x,time) ;
	}
}
function mousePressed()
{
	MX = mouseX ;
	MY = mouseY ;
	if(MY <= HEIGHT && MX <= WIDTH)
	{
		// Con seguridad es una tecla blanca
		if(MY > (HEIGHT/2)+30)
		{
			for(let i = 0 ; i < 12 ; i++)
			{
				if(!notes[i].Dom)
				{
					continue ;
				}
				if(notes[i].white == Math.floor(mouseX/50)%7)
				{
					tonic = i ;
				}
			}
		}
		else// Puede ser blanca o negra
		{
			change = false ;
			for(let i = 0 ; i < 11 ; i++)
			{
				if(notes[i].Dom)
				{
					continue ;
				}
				if(notes[i].x <= MX%(WIDTH/3) && MX%(WIDTH/3) <= notes[i].x+WIDTH/28)
				{
					tonic = i ;
					change = true ;
					break ;
				}
			}
			if(!change)
			{
				for(let i = 0 ; i < 12 ; i++)
				{
					if(!notes[i].Dom)
					{
						continue ;
					}
					if(notes[i].white == Math.floor(mouseX/50)%7)
					{
						tonic = i ;
					}
				}
			}
		}
		changeScale() ;
	}
}
const blacktile = (a,b) => {rect(a+b*WIDTH/3,0,WIDTH/28,(HEIGHT/2)+30,0,0,5,5);} ;
const whitetile = (a,b) => {rect(a+b*WIDTH/3,0,WIDTH/21,HEIGHT)} ;