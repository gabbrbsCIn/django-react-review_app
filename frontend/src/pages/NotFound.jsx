import MainLayout from "../components/MainLayout";

function NotFound() {
    return (
        <div>
            <MainLayout>
                <h1 className="px-36">Not Found</h1>
                <p className="px-36">A pagina que você procura não existe :(</p>
            </MainLayout>

        </div>
    )

};

export default NotFound;