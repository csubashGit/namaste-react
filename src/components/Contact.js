const Contact = () => {
    return (
        <div>
            <h2 className="font-bold bold-3xl p-2 m-2">I'm in Contact component</h2>
            <form>
                <input type="text" className="border border-black p-2 m-2" placeholder="name"/>
                <input type="text" className="border border-black p-2 m-2" placeholder="message"/>
                <button className="border border-black p-2 m-2 rounded-lg">Submit</button>
            </form>
        </div>
    )
}
export default Contact