export const formatPrice=
(amount:number)=>{
    return new Intl.NumberFormat(
        'en-EU',{
            style:'currency',
            currency:'EUR',
        }).format(amount)
        
    
}