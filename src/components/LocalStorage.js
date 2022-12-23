import '../styles/ls.css'
export default function LocalStorage() {
    localStorage.clear();

    const ls = localStorage;

    ls.setItem("testkey1", "test1");

    return(
        <div className='test'>
            <span>LocalStorage  Test :</span>
            <ul>
                {Object.keys(ls).map(key => (
                    <li>
                        {key} : {ls.getItem(key)}
                    </li>
                ))}
            </ul>

            <p>Valeur de "testkey1" = {ls.getItem("testkey1")}</p>
        </div>
    )
}