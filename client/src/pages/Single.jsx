import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://media.istockphoto.com/id/1182866691/photo/social-media-and-digital-online-concept-woman-using-smartphone-and-show-technology-icon.jpg?b=1&s=170667a&w=0&k=20&c=pqLif8f3YazKKkHUeQGMDN3DompPwyO4FdGby70fVX0="
          alt=""
        />
        <div className="user">
          <img
            src="https://images.unsplash.com/photo-1584119164246-461d43e9bab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZHNvbWUlMjBibGFjayUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60"
            alt=""
          />
          <div className="info">
            <span>Ayomide</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=5`}>
              <img src={Edit} alt="" />
            </Link>

            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
        <p>
          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero
          in 45 BC "Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
          ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. <br />
          <br />
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?" 1914 translation by H. Rackham "But I must
          explain to you how all this mistaken idea of denouncing pleasure and
          praising pain was born and I will give you a complete account of the
          system, and expound the actual teachings of the great explorer of the
          truth, the master-builder of human happiness. <br />
          <br />
          No one rejects, dislikes, or avoids pleasure itself, because it is
          pleasure, but because those who do not know how to pursue pleasure
          rationally encounter consequences that are extremely painful. Nor
          again is there anyone who loves or pursues or desires to obtain pain
          of itself, because it is pain, but because occasionally circumstances
          occur in which toil and pain can procure him some great pleasure. To
          take a trivial example, which of us ever undertakes laborious physical
          exercise, except to obtain some advantage from it? But who has any
          right to find fault with a man who chooses to enjoy a pleasure that
          has no annoying consequences, or one who avoids a pain that produces
          no resultant pleasure?"
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
