
export const CardTransactions = () => {
   return (
      <div className="max-w-xs bg-gray-100 rounded-xl p-6">
         <div className="py-10">
            <div className="flex justify-center gap-5">
               <h3 className="text-center">Latest Transactions</h3>
            </div>
            <div className="flex flex-col gap-6 py-4">
               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Jose Perez"
                  />
                  <span className="font-semibold">Jose Perez</span>
                  <span className="text-green-600 text-xs">4500 USD</span>
                  <span className="text-gray-500 text-xs">9/20/2021</span>
               </div>

               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Andrew Steven"
                  />
                  <span className="font-semibold">Andrew Steven</span>
                  <span className="text-green-600 text-xs">4500 USD</span>
                  <span className="text-gray-500 text-xs">9/20/2021</span>
               </div>

               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Ruben Garcia"
                  />
                  <span className="font-semibold">Ruben Garcia</span>
                  <span className="text-green-600 text-xs">1500 USD</span>
                  <span className="text-gray-500 text-xs">2/20/2022</span>
               </div>

               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Perla Garcia"
                  />
                  <span className="font-semibold">Perla Garcia</span>
                  <span className="text-green-600 text-xs">200 USD</span>
                  <span className="text-gray-500 text-xs">3/20/2022</span>
               </div>

               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Mathew Funez"
                  />
                  <span className="font-semibold">Mathew Funez</span>
                  <span className="text-green-600 text-xs">2444 USD</span>
                  <span className="text-gray-500 text-xs">5/20/2022</span>
               </div>

               <div className="flex items-center justify-between gap-6">
                  <img
                     className="w-12 h-12 rounded-full border border-gradient"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     alt="Carlos Diaz"
                  />
                  <span className="font-semibold">Carlos Diaz</span>
                  <span className="text-green-600 text-xs">3000 USD</span>
                  <span className="text-gray-500 text-xs">12/20/2022</span>
               </div>
            </div>
         </div>
      </div>
   );
};
