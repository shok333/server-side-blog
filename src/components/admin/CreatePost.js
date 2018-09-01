import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, Modifier, CompositeDecorator} from 'draft-js';

const HandleSpan = (props) => {
    return (
        <span
            style={{color: 'white', backgroundColor: 'green'}}
            data-offset-key={props.offsetKey}
        >
          {props.children}
        </span>
    );
};

const FloatSpan = (props) => {
    return (
        <span
            style={{color: 'black', backgroundColor: 'white'}}
            data-offset-key={props.offsetKey}
        >
          {props.children}
        </span>
    );
};

const Link = (props) => {
    const { url } = props.contentState
        .getEntity(props.entityKey).getData();

    return (
        <a href={url} title={url} className="ed-link">
            {props.children}
        </a>
    );
};

export default class CreatePost extends Component {
    constructor(props) {
        super(props)

        const decorator = new CompositeDecorator([
            // {
            //     strategy: (contentBlock, callback) => {
            //         const text = contentBlock.getText();
            //         const pattern = /<div>\w+<\/div>/ig;
            //         let result;
            //         while (result = pattern.exec(text)) {
            //             callback(result.index, result.index + result[0].length);
            //         }
            //     },
            //     component: HandleSpan,
            // },
            {
                strategy: (contentBlock, callback, contentState) => {
                    contentBlock.findEntityRanges(
                        (character) => {
                            const entityKey = character.getEntity();
                            console.log(entityKey);
                            return (
                                entityKey !== null &&
                                contentState.getEntity(entityKey).getType() === 'LINK'
                            );
                        },
                        callback
                    );
                },
                component: Link,
            },
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            editor: false
        };
    }

    componentDidMount() {
        this.setState({ editor: Editor })
    }

    changeHandler = (editorState) => {
        this.setState({
            editorState,
        });
    };

    addLink = () => {
        // получаем текущий editorState
        const { editorState } = this.state;
        // получаем текущий contentState
        const contentState = editorState.getCurrentContent();

        // создаем Entity
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'SEGMENTED',
            { url: 'https://translate.google.ru/' }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});

        // с помощью метода toggleLink из RichUtils генерируем новый
        // editorState и обновляем стейт
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            )
        });
    }

    render() {
        const ClientEditor = this.state.editor

        return (
            <div>
                {
                    this.state.editor ?
                        <ClientEditor
                            editorState={this.state.editorState}
                            onChange={this.changeHandler}
                        /> :
                        null
                }
                <button onClick={this.addLink}>add link</button>
            </div>
        )
    }
}