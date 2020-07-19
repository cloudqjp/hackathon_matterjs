var Engine = Matter.Engine, //�����V���~���[�V��������у����_�����O���Ǘ�����R���g���[���[�ƂȂ郁�\�b�h
	World = Matter.World, //�������Z�̈�̍쐬�E���삷�郁�\�b�h���܂�
	Body = Matter.Body, //���̂̃��f�����쐬�E���삷�郁�\�b�h���܂�
	Bodies = Matter.Bodies, //��ʓI�ȍ��̃��f�����쐬���郁�\�b�h���܂�
	Constraint = Matter.Constraint, //������쐬�E���삷�郁�\�b�h���܂�
	Composites = Matter.Composites,
	Common = Matter.Common,
	Vertices = Matter.Vertices, //���_�̃Z�b�g���쐬�E���삷�郁�\�b�h���܂�
	MouseConstraint = Matter.MouseConstraint; //�}�E�X�̐�����쐬���邽�߂̃��\�b�h���܂�
		
// Matter.js��Engine���쐬
var container = document.getElementById('canvas-container');
var engine = Engine.create(container, {
	render: { //�����_�����O�̐ݒ�
		options: {
			wireframes: false, //���C���[�t���[�����[�h��off
			width: 640, //canvas��width(����)
			height: 480, //canvas��height(����)
			background: 'rgba(0, 0, 0, 0)'
		}
	}
});
 
// �}�E�X�����ǉ�
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);
 
//�������
World.add(engine.world, [Bodies.rectangle(320, 460, 480, 20, {
	isStatic: true, //�Œ肷��
	render: {
		fillStyle: '#977559', // �h��Ԃ��F: CSS�̋L�q�@�Ŏw��
		strokeStyle: 'rgba(0, 0, 0, 0)', // ���̐F: CSS�̋L�q�@�Ŏw��
		lineWidth: 0
	}
})]);
 
//���̂�ǉ�����
for (var i = 0; i < 10; i++) {
	var rnd = parseInt(Math.random() * 10);
	var x = 320 + rnd * 10;
	var y = 0 - rnd * 120;
	rnd2 = parseInt(Math.random() * 640);
	var x2 = rnd2;
	var y2 = 0 - rnd2 * 2;
	
	World.add(engine.world, [
		Bodies.circle(x, y, 60, { //�{�[����ǉ�
			density: 0.0005, // ���x: �P�ʖʐς�����̎���
			frictionAir: 0.06, // ��C��R(��C���C)
			restitution: 1, // �e�͐�
			friction: 0.01, // �{�̖̂��C
			render: { //�{�[���̃����_�����O�̐ݒ�
				sprite: { //�X�v���C�g�̐ݒ�
					texture: './images/ball.png' //�X�v���C�g�Ɏg���e�N�X�`���摜���w��
				}
			},
			timeScale: 1.5 //���Ԃ̔{����ݒ�(1��1�{��)
		}),
		Bodies.rectangle(x2 , y2, 160, 32, { //�����`��ǉ�����
			render: {
				sprite: { //�X�v���C�g�̐ݒ�
					texture: './images/logo.png' //�X�v���C�g�Ɏg���e�N�X�`���摜���w��
				}
			}
		})
	]);
	
}
 
// �����V���~���[�V���������s
Engine.run(engine);