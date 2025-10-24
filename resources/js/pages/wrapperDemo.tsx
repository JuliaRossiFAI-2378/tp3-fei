import { useState } from "react";
import Header from "@/components/header";
import Frame from "@/components/Frame";
import { Button } from "@/components/ui/button";

export default function wrapperDemo() {
    const [entity, setEntity] = useState("games");
    const [id, setId] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);
        try{
            const response = await fetch(`http://localhost/tp3-fei/public/api/${entity}/${id}`);
            if (!response.ok){
                throw new Error(`HTTP ${response.status}`);
            }
            const json = await response.json();
            if (!json.success){
                throw new Error(json.error || "Error desconocido");
            }
            setResult(json.data);
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    const renderResult = (data) => {
        return (
            <ul className="space-y-1">
                {Object.entries(data).map(([key, value]) => (
                <li key={key} className="flex">
                    <span className="font-semibold w-32">{key}:</span>
                    <span>{String(value)}</span>
                </li>
                ))}
            </ul>
        );
    };

    return (
    <>
        <Header/>
        <div className="max-w-md mx-auto m-10">
            <Frame>
                <h2 className="text-2xl font-bold mb-6 text-center">Consultar por API</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Tabla</label>
                        <select className="w-full border border-gray-300 rounded px-3 py-2" value={entity} onChange={(e) => setEntity(e.target.value)} >
                            <option value="games">games</option>
                            <option value="users">users</option>
                            <option value="ghosts">ghosts</option>
                            <option value="npcs">enemies</option>
                            <option value="equipment">equipment</option>
                            <option value="items">items</option>
                            <option value="materials">materials</option>
                            <option value="effects">effects</option>
                            <option value="triggers">triggers</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">ID</label>
                        <input type="number"className="w-full border border-gray-300 rounded px-3 py-2" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-center" >
                        <Button type="submit" disabled={loading} >
                            Consultar
                        </Button>
                    </div>
                </form>

                {error && (
                    <div className="mt-4 p-3 bg-red-900 rounded">
                        {error}
                    </div>
                )}
                
                {result && (
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                        <p className="font-semibold" >
                            Endpoint de API:{" "/**lo que tengo que hacer para poner un espacio aca <|:-) */}  
                            <a href={`http://localhost/tp3-fei/public/api/${entity}/${id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mb-2" >
                                /api/{entity}/{id}
                            </a>
                            <h5 className="font-semibold mb-2">Resultado:</h5>
                        </p>
                        {renderResult(result)}
                    </div>
                )}
            </Frame>
        </div>
    </>
    );
}
