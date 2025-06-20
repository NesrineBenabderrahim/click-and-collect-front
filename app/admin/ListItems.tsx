import { Fade } from "react-awesome-reveal";
import useCard from "../hooks/useCard";
import Items from "./Items";
import { useEffect, useState } from "react";
import DropDowen from "./dropDowen";


interface ListItemProps{
    plat:boolean
    categorie:boolean
    shop:boolean
    user:boolean
}
const ListItem:React.FC<ListItemProps> = ({plat, categorie,shop,user}) => {
    const {card,getDataCard,dataUser,getAllUser,AllUser}=useCard()
    useEffect(()=>{
        if (dataUser.role === "admin"){
            getAllUser()
        }
    },[])
    
    // {AllUser && console.log(AllUser)}
    //console.log(card.items)
    const DeleteShop = async (id: any) => {
        const url = `http://localhost:8080/api/shoplist/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            getDataCard()
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });

    };
    const DeleteCategorie = async (id: any) => {
        const url = `http://localhost:8080/api/categories/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            getDataCard()
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });

    };
    const DeleteItem = async (id: any) => {
        const url = `http://localhost:8080/api/items/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            getDataCard()
            console.log(response)

            })
            .catch(error => {
                console.log(error)
            });
    };
    const DeleteUser = async (id: any) => {
        const url = `http://localhost:8080/api/user/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            getAllUser()
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };
    const [categorieFilter, setCayegorieFilter] = useState('all')
    console.log({categorieFilter})
    let filtredItem :any

    if(card){

        if(typeof categorieFilter != undefined && categorieFilter !== 'all'){
            filtredItem =card.items.filter((item:any)=> item.categoryParent=== categorieFilter)
    
        }else if(typeof categorieFilter != undefined && categorieFilter === 'all'){
            filtredItem = card.items.map((item:any)=> item)
        }
    }
    console.log({filtredItem})
    let filtredcategorie :any

    if(card){

        if(typeof categorieFilter != undefined && categorieFilter !== 'all'){
            filtredcategorie = card.categories.filter((item: any) => item.shopParent.includes(categorieFilter));

    
        }else if(typeof categorieFilter != undefined && categorieFilter === 'all'){
            filtredcategorie = card.categories.map((item:any)=> item)
        }
    }
    console.log({filtredcategorie})

    let filtreduser :any

    if(card && AllUser){

        if(typeof categorieFilter != undefined && categorieFilter !== 'all'){
            filtreduser = AllUser.filter((item: any) => item.role=== categorieFilter);

    
        }else if(typeof categorieFilter != undefined && categorieFilter === 'all'){
            filtreduser = AllUser.map((item:any)=> item)
        }
    }
    console.log({filtreduser})



    return ( 
        <div className="col-span-1 w-[60%] justify-self-end  ">  
        <Fade
        direction={"up"}
        delay={800}
        cascade
        damping={1e-1}
        triggerOnce={true}
        >
        <div className=" relative justify-content border-[1.2px]  border-slate-400 bg-slate-800   text-white shadow-md  rounded-t-xl ml-4 mr-4 mt-4 ">
            <div className="flex w-full p-4 ">
                {plat && <div className="flex items-center justify-between w-full"><p >Liste de plat</p>  <DropDowen plat={plat}  categorie={categorie} shop={shop} user={user} setCayegorieFilter={setCayegorieFilter}/> <p>{filtredItem.length}</p></div>  }
                {categorie && <div className="flex items-center justify-between w-full"> <p >Liste de categorie</p> <DropDowen plat={plat}  categorie={categorie} shop={shop} user={user} setCayegorieFilter={setCayegorieFilter}/> <p>{filtredcategorie.length}</p> </div> }
                {shop && <div className="flex items-center justify-between w-full"><p className="">Liste de restaurant</p> <p>{card.shoplist.length}</p></div>}
                {user && <div className="flex items-center justify-between w-full"><p className="">Liste d'utilisateur</p> <DropDowen plat={plat}  categorie={categorie} shop={shop} user={user} setCayegorieFilter={setCayegorieFilter}/> <p>{filtreduser.length}</p></div>}


            </div>
        </div>
        </Fade>
        <Fade
        direction={"up"}
        delay={800}
        cascade
        damping={1e-1}
        triggerOnce={true}
        >
        <div className=" relative justify-content border-b-[1.2px]  border-l-[1.2px] border-r-[1.2px] border-slate-400 bg-white  shadow-md  rounded-b-xl ml-4 mr-4 mb-4">
        <div className="grid flex-row p-2  items-center justify-content  w-full ">
        { card && filtredItem && plat && filtredItem.map((item: any, i:any) => {
                return (
                <div key={i}>
                    <Items item={item} onDelete={DeleteItem} plat={plat}  categorie={categorie} shop={shop} user={user}/>
                </div>
                );
            })}
        { card && categorie && filtredcategorie.map((item: any, i:any) => {
                return (
                <div key={i} className="w-full">
                    <Items item={item}  onDelete={DeleteCategorie}  plat={plat} categorie={categorie} shop={shop} user={user}/>
                </div>
                );
            })}
        { card && shop && card.shoplist.map((item: any, i:any) => {
            return (
            <div key={i} className="w-full">
                <Items item={item}  onDelete={DeleteShop}  plat={plat} categorie={categorie} shop={shop} user={user} />
            </div>
            );
            })}
            { AllUser && user && filtreduser.map((item: any, i:any) => {
            return (
            <div key={i} className="w-full">
                <Items item={item}  onDelete={DeleteUser}  plat={plat} categorie={categorie} shop={shop} user={user} />
            </div>
            );
            })}
        </div>
        </div>
    </Fade>
    </div>
    );
}

export default ListItem;