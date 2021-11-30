import * as React from 'react'
import Modal from 'react-modal'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
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
  const display_image = getImage(data.mdx.frontmatter.pc_image_display)
  const display_image_alt = data.mdx.frontmatter.pc_image_display_alt

  const image = getImage(data.mdx.frontmatter.pc_image)
  const image_alt = data.mdx.frontmatter.pc_image_alt

  // モーダルの表示状態と切替えるためにState(props)を準備
  const [modalIsOpen, setIsOpen] = React.useState(false)

  // shouldCloseOnEscやshouldCloseOnOverlayCloseを使う場合に設定が必要
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Layout pageTitle={data.mdx.frontmatter.slug} topFlag={false}>
      <Seo title={`${data.mdx.frontmatter.title}(PC用画面)`} description="PC用画面のサンプル画像を見せるページです" article={true} />
      <div>
        <article>
          <div className={Css.imageContainer}>
            <GatsbyImage image={display_image} alt={display_image_alt} className={Css.displayImage} onClick={() => setIsOpen(true)} />
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
      pc_image_display_alt
      pc_image_display {
        childImageSharp {
          gatsbyImageData
        }
      }
      pc_image_alt
      pc_image {
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
