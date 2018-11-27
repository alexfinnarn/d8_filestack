<?php

namespace Drupal\filestack\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "filestack" plugin.
 *
 * @CKEditorPlugin(
 *   id = "filestack",
 *   label = @Translation("Filestack"),
 *   module = "filestack"
 * )
 */
class Filestack extends CKEditorPluginBase implements CKEditorPluginConfigurableInterface {

    /**
     * {@inheritdoc}
     */
    public function getFile() {
        return drupal_get_path('module', 'filestack'). '/js/plugins/ckeditor/plugin.es6.js';
    }

    /**
     * {@inheritdoc}
     */
    public function getLibraries(Editor $editor) {
        return [
          'filestack/filestack',
        ];
    }

    /**
     * {@inheritdoc}
     */
public function getConfig(Editor $editor) {
    $settings = $editor->getSettings();
    return ['aaa_filestack_api_key' => $settings['plugins']['filestack']['api_key']];
}

    /**
     * {@inheritdoc}
     */
    public function getButtons() {
        return [
          'Filestack' => [
            'label' => $this->t('Filestack'),
            'image' => drupal_get_path('module', 'filestack') . '/js/plugins/ckeditor/icons/fs-logo.svg',
          ],
        ];
    }

    /**
     * {@inheritdoc}
     *
     * @see \Drupal\editor\Form\EditorImageDialog
     * @see editor_image_upload_settings_form()
     */
    public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
        $form_state->loadInclude('editor', 'admin.inc');

        $foo = 'bar';

        $form['api_key'] = [
          '#type' => 'textfield',
          '#title' => $this->t('Filestack API key'),
          '#maxlength' => 255,
          '#default_value' => $editor->getSettings()['plugins']['filestack']['api_key'],
        ];

//        $form['image_upload']['#attached']['library'][] = 'ckeditor/drupal.ckeditor.drupalimage.admin';
//        $form['image_upload']['#element_validate'][] = [$this, 'validateImageUploadSettings'];
        return $form;
    }

    /**
     * #element_validate handler for the "image_upload" element in settingsForm().
     *
     * Moves the text editor's image upload settings from the DrupalImage plugin's
     * own settings into $editor->image_upload.
     *
     * @see \Drupal\editor\Form\EditorImageDialog
     * @see editor_image_upload_settings_form()
     */
//    public function validateImageUploadSettings(array $element, FormStateInterface $form_state) {
//        $settings = &$form_state->getValue(['editor', 'settings', 'plugins', 'drupalimage', 'image_upload']);
//        $form_state->get('editor')->setImageUploadSettings($settings);
//        $form_state->unsetValue(['editor', 'settings', 'plugins', 'drupalimage']);
//    }

}
