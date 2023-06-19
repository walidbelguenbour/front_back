import { useState } from 'react';

function Table() {
  const [data, setData] = useState([
    { id: 1, nom: 'Signalement 1', categorie: 'Catégorie 1', date: '2022-01-01', statut: 'En cours' },
    { id: 2, nom: 'Signalement 2', categorie: 'Catégorie 2', date: '2022-02-01', statut: 'Terminé' },
    { id: 3, nom: 'Signalement 3', categorie: 'Catégorie 1', date: '2022-03-01', statut: 'En cours' },
    { id: 4, nom: 'Signalement 4', categorie: 'Catégorie 2', date: '2022-04-01', statut: 'Terminé' },
    { id: 5, nom: 'Signalement 5', categorie: 'Catégorie 1', date: '2022-05-01', statut: 'En cours' },
    { id: 6, nom: 'Signalement 6', categorie: 'Catégorie 2', date: '2022-06-01', statut: 'Terminé' },
  ]);

  const [orderBy, setOrderBy] = useState(null);

  const handleOrderBy = (key) => {
    if (orderBy === key) {
      setData([...data.reverse()]);
    } else {
      setData([...data.sort((a, b) => a[key] > b[key] ? 1 : -1)]);
    }
    setOrderBy(key);
  }

  const handleDelete = (id) => {
    setData([...data.filter((item) => item.id !== id)]);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom de signalement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date <button onClick={() => handleOrderBy('date')} className="underline">Trier</button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
        </div>
    </div>
</div>
</div>
);
}

export default Table;