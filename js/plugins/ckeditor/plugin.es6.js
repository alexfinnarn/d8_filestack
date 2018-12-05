/**
 * @file
 *
 * CKEditor plugin for Filestack picker.
 */
(function($, Drupal, CKEDITOR) {

  CKEDITOR.plugins.add('filestack', {
    icons: 'fs-logo.svg',
    // hidpi: true,

    init(editor) {
      editor.addCommand('filestack', {
        exec(editor) {

          // @todo Need to place this in a generic key since it is tied to the text format.
          const apikey = drupalSettings.editor.formats.basic_html.editorSettings.filestack_api_key;
          const client = filestack.init(apikey);
          const options = {
            maxFiles: 20,
            uploadInBackground: false,
            onOpen: () => console.log('opened!'),
            onUploadDone: (res) => {
              console.log(res);

              editor.setData(`<img src="${res.filesUploaded[0].url}" />`);
            },
          };
          client.picker(options).open();
        }
      });

      // Register the toolbar button.
      if (editor.ui.addButton) {
        editor.ui.addButton('Filestack', {
          label: Drupal.t('Filestack'),
          command: 'filestack',
        });
      }
    },
  });

})(jQuery, Drupal, CKEDITOR);
