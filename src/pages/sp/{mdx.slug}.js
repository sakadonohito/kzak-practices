import * as React from 'react'
import Modal from 'react-modal'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import * as Css from './{mdx.slug}.module.css'

// react-modalの初期設定
// root-nodeのselectorを設定
Modal.setAppElement("#___gatsby")
// react-modalのデザインを設定修正する場合の例
//Modal.defaultStyles.overlay.backgroundColor = "black"

/*
const ModalSingle = () => {

}
*/


const PostPage = ({data}) => {
  const display_image_top = getImage(data.mdx.frontmatter.sp_image_display_top)
  const display_image_top_alt = data.mdx.frontmatter.sp_image_display_top_alt
  const display_image_bottom = getImage(data.mdx.frontmatter.sp_image_display_bottom)
  const display_image_bottom_alt = data.mdx.frontmatter.sp_image_display_bottom_alt
  
  const image = getImage(data.mdx.frontmatter.sp_image)
  const image_alt = data.mdx.frontmatter.sp_image_alt

  // モーダルの表示状態と切替えるためにState(props)を準備
  const [modalIsOpen, setIsOpen] = React.useState(false)

  // shouldCloseOnEscやshouldCloseOnOverlayCloseを使う場合に設定が必要
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Layout pageTitle={data.mdx.frontmatter.slug} topFlag={false}>
      <div>
        <article>
          <div className={Css.imageContainer} onClick={() => setIsOpen(true)} >
            <GatsbyImage image={display_image_top} alt={display_image_top_alt} imgClassName={Css.displayImage}  />
            <GatsbyImage image={display_image_bottom} alt={display_image_bottom_alt} imgClassName={Css.displayImage} />
          </div>
          <h2 className={Css.title}>{data.mdx.frontmatter.title}</h2>
          <section>
            <div className={Css.postBody}>
              <MDXRenderer>
	        {data.mdx.body}
              </MDXRenderer>
            </div>
            <div className={"back-to-top-container"}>
              <Link to={'/'}>TOPページに戻る</Link>
            </div>
          </section>
        </article>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose = {() => handleCloseModal() }
        shouldCloseOnEsc = {true}
        shouldCLoseOnOverlayClick = {true}
        overlayClassName={Css.reactModalOverlay}
        className={Css.reactModal}
        bodyOpenClassName={"ReactModal__Body--open"}
      >
        <GatsbyImage
          image={image}
          alt={image_alt}
          onClick={() => setIsOpen(true)}
        />
      </Modal>
    </Layout>
  )
}

export const query = graphql`
query ($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      sp_image_display_top_alt
      sp_image_display_top {
        childImageSharp {
          gatsbyImageData (
            layout: CONSTRAINED
            width: 349
          )
        }
      }
      sp_image_display_bottom_alt
      sp_image_display_bottom {
        childImageSharp {
          gatsbyImageData (
            layout: CONSTRAINED
            width: 349
          )
        }
      }
      sp_image_alt
      sp_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    slug
    body
  }
}
`

export default PostPage
