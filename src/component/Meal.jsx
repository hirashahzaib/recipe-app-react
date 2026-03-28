import React, { useEffect, useState } from 'react'
import RecipeModal from './RecipeModal';


function Meal() {
    const [mealData, setMealData] = useState([]);
    const [area, setArea] = useState('Canadian')
    const [inputData, setInputData] = useState('')

    const [recipe, setRecipe] = useState(null);
    const [show, setShow] = useState(false);


    useEffect(() => {
        const fetchDataApi = async () => {
            const api = await fetch
                (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}
                `)
            const data = await api.json();
            console.log(data)
            setMealData(data.meals || [])
        }

        fetchDataApi();
    }, [area])

    const submitHandler = async (e) => {
        e.preventDefault();
        const api = await fetch
            (`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
        const data = await api.json();
        console.log(data)
        setMealData(data.meals || [])
        setInputData("")

    }

    const getRecipe = async (id) => {
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();

        setRecipe(data.meals[0]);
        setShow(true);
    };

    const areas = [
        { name: 'Canadian', color: 'primary' },
        { name: 'Indian', color: 'secondary' },
        { name: 'British', color: 'success' },
        { name: 'American', color: 'danger' },
        { name: 'Malaysian', color: 'warning' },
        { name: 'Australian', color: 'info' }
    ]

    return (
        <>

            <div className='buttons d-flex gap-2 align-items-center justify-content-center'>
                {areas.map((item) => (
                    <button key={item.name}
                        className={`btn btn-outline-${item.color} `}
                        onClick={() => setArea(item.name)}>{item.name}</button>
                ))}
            </div>

            <form className='m-3 text-center' onSubmit={submitHandler}>
                <input type="text" value={inputData} className='p-2' onChange={(e) => setInputData(e.target.value)} />
                <button className='btn btn-primary m-3 p-3 '>Search</button>
            </form>

            <div className='mx-auto text-center ' style={
                {

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                }
            }>
                {mealData.map((data) => (
                    <div key={data.idMeal} >
                        <div style={{ width: '200px', height: '200px' }}>
                            <img
                                src={data.strMealThumb} alt=""
                                onClick={() => getRecipe(data.idMeal)}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: '2px solid yellow',
                                    outline: "none"
                                }}
                            />
                        </div>
                        <h5 style={{ width: '200px', height: '50px', marginTop: '12px', userSelect: 'none' }}>{data.strMeal}</h5>
                    </div>
                ))}


            </div>



            {recipe && (
                <RecipeModal
                    recipe={recipe}
                    show={show}
                    setShow={setShow}
                />
            )}

        </>
    )
}

export default Meal