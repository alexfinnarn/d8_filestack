/**
 * @file
 *
 * CKEditor plugin for Filestack picker.
 */
(function($, Drupal, CKEDITOR) {

  console.log('who done it!');

  CKEDITOR.plugins.add('filestack', {
    // requires: 'image2',
    icons: 'filestack',
    hidpi: true,

    init(editor) {
      editor.addCommand('filestack', {
        exec(editor) {
          const apikey = drupalSettings.editor.formats.basic_html.editorSettings.aaa_filestack_api_key;
          const client = filestack.init(apikey);
          const options = {
            maxFiles: 20,
            uploadInBackground: false,
            onOpen: () => console.log('opened!'),
            onUploadDone: (res) => console.log(res),
          };
          client.picker(options).open();
        }
      });

      // Register the toolbar button.
      if (editor.ui.addButton) {
        editor.ui.addButton('Filestack', {
          label: Drupal.t('Filestack'),
          // Note that we use the original image2 command!
          command: 'filestack',
        });
      }
    },
  });



})(jQuery, Drupal, CKEDITOR);
